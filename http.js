const http = require('http');
const url = require('url');
const qs = require('querystring');

// In-memory array to store employee data
let employees = [
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Smith', position: 'Designer' },
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Handle different CRUD operations based on the request path
    switch (req.method) {
        case 'GET':
            if (path === '/employees') {
                // Read all employees
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(employees));
            } else if (path.startsWith('/employee/')) {
                // Read a specific employee by ID
                const employeeId = parseInt(path.split('/')[2]);
                const employee = employees.find(emp => emp.id === employeeId);
                if (employee) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(employee));
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Employee not found');
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
            break;

        case 'POST':
            if (path === '/employees') {
                // Create a new employee
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const newEmployee = qs.parse(body);
                    newEmployee.id = employees.length + 1;
                    employees.push(newEmployee);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newEmployee));
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
            break;

        case 'PUT':
            if (path.startsWith('/employee/')) {
                // Update a specific employee by ID
                const employeeId = parseInt(path.split('/')[2]);
                const employeeIndex = employees.findIndex(emp => emp.id === employeeId);
                if (employeeIndex !== -1) {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        const updatedEmployee = qs.parse(body);
                        employees[employeeIndex] = { id: employeeId, ...updatedEmployee };
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(employees[employeeIndex]));
                    });
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Employee not found');
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
            break;

        case 'DELETE':
            if (path.startsWith('/employee/')) {
                // Delete a specific employee by ID
                const employeeId = parseInt(path.split('/')[2]);
                employees = employees.filter(emp => emp.id !== employeeId);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Employee deleted successfully' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// routing with switch statement
// request data handling
// response handling.
