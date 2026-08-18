import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

fub_api_key = os.getenv("FUB_API_KEY")
fub_system = os.getenv("FUB_SYSTEM")
fub_system_key = os.getenv("FUB_SYSTEM_KEY")

fub_events_api = "https://api.followupboss.com/v1/events"

fub_headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-System": fub_system,
    "X-System-Key": fub_system_key
}

app = Flask(__name__)
CORS(app)


@app.route("/")
def health_check():
    return jsonify({"status": "ok"}), 200


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}

    full_name = data.get("fullName", "").strip()
    email = data.get("email", "").strip()
    phone = data.get("phone", "").strip()
    interest = data.get("interest", "").strip()
    message = data.get("message", "").strip()

    listing_id = data.get("listingId", "").strip()
    intent = data.get("intent", "").strip()
    listing_price = data.get("listingPrice", "").strip()
    listing_city = data.get("listingCity", "").strip()
    listing_address = data.get("listingAddress", "").strip()
    preferred_date = data.get("preferredDate", "")
    preferred_time = data.get("preferredTime", "")

    if not full_name:
        return jsonify({"message": "Full name is required."}), 400
    name_parts = full_name.split()
    first_name = name_parts[0]
    last_name_parts = name_parts[1:]
    last_name = " ".join(last_name_parts)

    if not email:
        return jsonify({"message": "Email is required."}), 400

    if "@" not in email:
        return jsonify({"message": "Please enter a valid email."}), 400

    if not phone:
        return jsonify({"message": "Phone number is required."}), 400

    phone_digits = ""
    allowed_characters = "() -"

    for character in phone:
        if character.isdigit():
            phone_digits += character
        elif character in allowed_characters:
            pass
        else:
            return jsonify({"message": "Invalid phone number."}), 400

    if len(phone_digits) != 10:
        return jsonify({"message": "Invalid phone number."}), 400

    if not interest:
        return jsonify({"message": "Please select what you're interested in."}), 400

    allowed_interests = ["buying", "selling", "investing", "general"]

    if interest not in allowed_interests:
        return jsonify({"message": "Invalid interest selected."}), 400

    allowed_intents = ["", "interest", "tour"]

    if intent not in allowed_intents:
        return jsonify({"message": "Invalid contact intent."}), 400

    if intent == "tour" and (not preferred_date or not preferred_time):
        return jsonify({
            "message": "Please select a preferred tour date and time."
        }), 400


    if message and len(message) > 1000:
        return jsonify({"message": "Message too long."}), 400


    contact_request = {
        "fullName": full_name,
        "email": email,
        "phone": phone_digits,
        "interest": interest,
        "message": message,
        "listingId": listing_id,
        "intent": intent,
        "listingPrice": listing_price,
        "listingCity": listing_city,
        "listingAddress": listing_address,
        "preferredDate": preferred_date,
        "preferredTime": preferred_time,
    }
    description = f"Interest: {interest.title()}"

    if intent == "tour":
        description += (
            f"\nPreferred Tour Date: {preferred_date}"
            f"\nPreferred Tour Time: {preferred_time}"
        )

    if listing_id:
        event_type = "Property Inquiry"
    else:
        event_type = "General Inquiry"

    # FUB PAYLOAD 
    fub_payload = {
        "type": event_type,
        "message": message,
        "description": description,
        "person": {
            "firstName": first_name,
            "lastName": last_name,
            "emails": [
                {
                    "value": email,
                    "type": "home"
                }
            ],
            "phones": [
                {
                    "value": phone_digits,
                    "type": "home"
                }
            ],
        }
    }
    
    if listing_id: 
        price_digits = listing_price.replace("$", "").replace(",", "")
        listing_price_number = int(price_digits) if price_digits else None

        fub_payload["property"] = {
            "street": listing_address,
            "city": listing_city,
            "state": "CA",
            "price": listing_price_number,
        }

    print(contact_request)

    if not fub_api_key or not fub_system or not fub_system_key:
        return jsonify({
            "message": "Contact form received, but FUB is not configured yet."
        }), 500

    try:
        fub_response = requests.post(
            fub_events_api,
            headers=fub_headers,
            auth=(fub_api_key, ""),
            json=fub_payload,
            timeout=10
        )
        print("FUB status:", fub_response.status_code)

        if not fub_response.ok:
            print("FUB error:", fub_response.status_code, fub_response.text)
            return jsonify({
                "message": "Contact form received, but there was an issue sending it to FUB."
            }), 502

    except requests.RequestException as error:
        print("FUB request failed:", error)
        return jsonify({
            "message": "Contact form received, but FUB could not be reached."
        }), 502

    return jsonify({
        "message": "Thank you, I will get back to you as soon as possible."
    }), 200


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    app.run(debug=True, port=port)
