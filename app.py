import serial.tools.list_ports
from flask import Flask, render_template, request,redirect,url_for
from threading import Thread
from flask_socketio import SocketIO
from threading import Thread

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

app = Flask(__name__)
app.debug = True

# Create serial port instance
serialInst = serial.Serial('/dev/tty.usbserial-120', 9600)
#port = '/dev/tty.usbmodem1201'
#serialInst.port = port 
#serialInst.open()

# Global variable to store status
pk = 'Away'
ss = "Away"
sj = "Away"
am = "Away"

def check_access(data):
    global pk,ss,sj,am
    if '1' in data:
        pk="Home"
    elif data == '2':
        ss="Home"
    elif data=='3':
        sj="Home"
    elif data=='4':
        am="Home"
    return pk,ss,sj,am

def read_serial_data():
    global pk, ss, sj, am
    try:
        while True:
            if serialInst.is_open:
                if serialInst.in_waiting:
                    packet = serialInst.readline()
                    received_data = packet.decode('utf')
                    pk, ss, sj, am = check_access(received_data)
                    print(pk)
                    socketio.emit('status_update', {'status1': pk, 'status2': ss, 'status3': sj, 'status4': am})
            else:
                print("Serial port is not open.")
    except Exception as e:
        print(f"Error in read_serial_data: {e}")
            
            
            

# Start the background thread to continuously check the status
serial_thread = Thread(target=read_serial_data)
serial_thread.start()

@app.route('/')
def home():
    return render_template("login.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
    error_message = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == "509" and password == "123":
            return render_template("index.html",status1=pk,status2=ss,status3=sj,status4=am)
    
    return render_template('login.html', error_message=error_message)

if __name__ == '__main__':
    app.run(debug=True, port='5001', host='0.0.0.0')