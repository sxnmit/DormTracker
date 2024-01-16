import serial.tools.list_ports
from flask import Flask, render_template, request,redirect,url_for
from threading import Thread

app = Flask(__name__)

# Create serial port instance
serialInst = serial.Serial()
port = '/dev/tty.usbmodem1201'
serialInst.baudrate = 9600
serialInst.port = port 
serialInst.open()

# Global variable to store status
x = 'Away'

def check_access(data):
    for letter in data:
        if letter == "i":
            return False
    return True

def read_serial_data():
    global x
    while True:
        if serialInst.in_waiting:
            packet = serialInst.readline()
            received_data = packet.decode('utf')
            if check_access(received_data):
                x = "Home"
            else:
                x = "Away"

# Start the background thread to continuously check the status
serial_thread = Thread(target=read_serial_data)
serial_thread.start()

@app.route('/')
def home():
    return render_template("login.html")


@app.route('/change_status/<roommate>/<new_status>')
def change_status(roommate, new_status):
    global roommate_statuses
    roommate_statuses[roommate] = new_status
    return redirect(url_for('index'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    error_message = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == "509" and password == "123":
            return render_template("index.html",status=x)
    
    return render_template('login.html', error_message=error_message)

if __name__ == '__main__':
    app.run(debug=True, port='5001', host='0.0.0.0')