from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

api = Api(app)

# ////////////TEST RUN CONTACT PAGE//////////////
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

    print(contact_request)

    return jsonify({
        "message": "Thank you, I will get back to you as soon as possible."
    }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5001)
