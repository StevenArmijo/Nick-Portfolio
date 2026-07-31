from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

api = Api(app)

video_put_args = reqparse.RequestParser()
video_put_args.add_argument("name", type=str, help="Name of Video Required", required=True)
video_put_args.add_argument("views", type=int, help="Views of Video Required", required=True)
video_put_args.add_argument("likes", type=int, help="Likes on Video Required", required=True)

videos = {}

def abort_video_if_video_na(video_id):
    if video_id not in videos:
        abort(404, message ="Video id is not valid...")
    
    def abort_if_video_exists(video_id):
        if video_id in videos:
            abort(409, message="Video already exists...")

class Video(Resource):
    def get(self, video_id):
        abort_video_if_video_na(video_id)
        return videos[video_id]


    def put(self, video_id):
        args = video_put_args.parse_args()
        videos[video_id] = args
        return videos[video_id], 201

    def delete(self, video_id):
        abort_video_if_video_na(video_id)
        del videos[video_id]
        return '', 204

api.add_resource(Video, "/video/<int:video_id>")



# ////////////TEST RUN CONTACT PAGE//////////////
@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    
    full_name = data.get("fullName")
    email = data.get("email")
    phone = data.get("phone")
    interest = data.get("interest")
    message = data.get("message")
    listing_id = data.get("listingId")
    intent = data.get("intent")
    listing_price = data.get("listingPrice")
    listing_city = data.get("listingCity")
    listing_address = data.get("listingAddress")
    
    if not full_name:
        return {"message": "Full Name is Required"}, 400

    if not email:
        return {"message": "Email is Required"}, 400
    if "@" not in email:
        return {"message": "Please Enter a Valid Email"}, 400

    if not phone:
        return {"message": "Phone Number Required"}, 400
    
    phone_digits = ""     
    allowed_characters = "() -"

    for character in phone:
        if character.isdigit():
            phone_digits = phone_digits + character
        
        elif character in allowed_characters:
            pass
        else:
            return {"message": "Invalid Phone Number"}, 400

    if len(phone_digits) != 10:
        return {"message": "Invalid Phone Number"}, 400
    
    print(phone_digits)

    if not interest:
        return {"message": "Please Select What You're Interested In"}, 400

    allowed_interests = ["buying", "selling", "investing", "general"]
    if interest not in allowed_interests:
        return {"message": "Invalid Interest Selected"}, 400

    allowed_intents = ["", "interest", "tour"]
    if intent not in allowed_intents:
        return {"message": "Invalid Contact Intent"}, 400

    
    if message and len(message) > 1000:
        return {"message": "Message Too Long"}, 400

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
    }

    print(contact_request)
    return {"message": "Thank you, will get back to you as soon as possible"}, 200


if __name__ == "__main__":
    app.run(debug=True, port=5001)
   
