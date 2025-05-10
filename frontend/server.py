from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import re

class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Store the original path before it gets modified
        super().__init__(*args, **kwargs)
    
    def do_GET(self):
        # If requesting known assets, serve them directly
        if self.path.startswith('/assets/') or self.path == '/favicon.ico':
            return SimpleHTTPRequestHandler.do_GET(self)
        
        # For all other paths (including /product/1, /shop, etc.), serve index.html
        self.path = '/index.html'
        return SimpleHTTPRequestHandler.do_GET(self)

    def end_headers(self):
        # Enable CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        # Set correct content types
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
        elif self.path.endswith('.css'):
            self.send_header('Content-Type', 'text/css')
        elif self.path.endswith('.html'):
            self.send_header('Content-Type', 'text/html')
        return SimpleHTTPRequestHandler.end_headers(self)

def run(port=8000):
    # Change to the dist directory
    os.chdir('dist')
    
    # Create server
    server_address = ('', port)
    httpd = HTTPServer(server_address, SPAHandler)
    
    print(f'Starting server on http://localhost:{port}')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down server...')
        httpd.server_close()

if __name__ == '__main__':
    run()
