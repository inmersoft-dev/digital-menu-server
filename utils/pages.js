const notFound = (route, method = "GET") => {
  return `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot ${method} ${route}</pre> </body> </html>`;
};

module.exports = {
  notFound,
};
