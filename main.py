from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates 
from pathlib import Path 

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

path = Path(__file__).parent

templates = Jinja2Templates(directory="templates")

@app.get("/")
async def root():
    print("path: ")
    print(path)
    html_file = path / 'templates' / 'index.html'
    print("html_file: ")
    print(html_file)
    return HTMLResponse(html_file.open().read())
    # return { "message": "Hello World" }
    # return templates.TemplateResponse("index.html", { "request": request, "id": id })

