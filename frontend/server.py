from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class SPAHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        file_path = self.translate_path(self.path)
        
        if os.path.exists(file_path) and os.path.isfile(file_path):
            # if the file exists, serve it normally
            return SimpleHTTPRequestHandler.do_GET(self)
        else:
            # for all other routes, serve index.html
            self.path = '/index.html'
            return SimpleHTTPRequestHandler.do_GET(self)

    def end_headers(self):
        # enable CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        # set correct content types
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
        elif self.path.endswith('.css'):
            self.send_header('Content-Type', 'text/css')
        elif self.path.endswith('.html'):
            self.send_header('Content-Type', 'text/html')
        return SimpleHTTPRequestHandler.end_headers(self)

def run(port=8000):
    # change to the dist directory
    os.chdir('dist')
    
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
