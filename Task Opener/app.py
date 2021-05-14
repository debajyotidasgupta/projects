import tkinter as tk
from tkinter import filedialog, Text
import os


apps = list()
if os.path.isfile('save.txt'):
    with open('save.txt', 'r') as f:
        apps = f.read().split(',')


def addApp():
    for widget in frame.winfo_children():
        widget.destroy()

    filename = filedialog.askopenfilename(
        initialdir='/',
        title='Select File',
        filetypes=(
            ("executables", '*.exe'),
            ("All files", "*.*")
        )
    )

    if filename:
        apps.append(filename)
        print(filename)

    for app in apps:
        label = tk.Label(frame, text=app, bg='gray')
        label.pack()


def runApps():
    for app in apps:
        os.startfile(app)


root = tk.Tk()

canvas = tk.Canvas(
    root,
    height=400,
    width=400,
    bg="#263D42"
)
canvas.pack()

frame = tk.Frame(canvas, bg='white')
frame.place(
    relwidth=0.8,
    relheight=0.8,
    relx=0.1,
    rely=0.1
)

openfile = tk.Button(
    root,
    text="Open File",
    padx=10,
    pady=10,
    fg='white',
    bg="#263D42",
    command=addApp
)
openfile.pack()

runApps = tk.Button(
    root,
    text="Run Apps",
    padx=10,
    pady=10,
    fg='white',
    bg="#263D42",
    command=runApps
)
runApps.pack()

for app in apps:
    label = tk.Label(frame, text=app)
    label.pack()

root.mainloop()

with open('save.txt', 'w') as f:
    f.write(','.join(map(str, apps)))
