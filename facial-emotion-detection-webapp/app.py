import base64
import io
from flask import Flask, render_template, request
import cv2
from keras.models import load_model
import numpy as np
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1


@app.route('/')
def index():
    return render_template(r'index.html')


@app.route('/after', methods=['GET', 'POST'])
def after():
    # img = request.files['file1']

    # img=base64.decodestring(sagnik_string)

    # sagnik_string = request.get_json()["image"]

    sagnik_string = request.get_json(force=True)["image"]

    print(sagnik_string)

    img = base64.b64decode(str(sagnik_string))
    img = Image.open(io.BytesIO(img))

    img.save(r'file.jpeg')

    ####################################
    img1 = cv2.imread(r'file.jpeg')
    gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt2.xml')
    faces = cascade.detectMultiScale(gray, 1.1, 3)

    for x, y, w, h in faces:
        cv2.rectangle(img1, (x, y), (x+w, y+h), (0, 255, 0), 2)

        cropped = img1[y:y+h, x:x+w]

    cv2.imwrite(r'after.jpeg', img1)

    try:
        cv2.imwrite(r'cropped.jpeg', cropped)

    except:
        pass

    #####################################

    try:
        image = cv2.imread(r'cropped.jpeg', 0)
    except:
        image = cv2.imread(r'file.jpeg', 0)

    image = cv2.resize(image, (48, 48))

    # image = image/255.0

    image = np.reshape(image, (1, 48, 48, 1))

    model = load_model('model_3.h5')

    prediction = model.predict(image)

    label_map = ['Neutral', 'Happy', 'Sad']

    prediction = np.argmax(prediction)

    final_prediction = label_map[prediction]

    return {
        "result": final_prediction
    }


if __name__ == "__main__":
    app.run(debug=True)
