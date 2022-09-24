<?php
  set_time_limit(0); // Disable timeout
  ob_implicit_flush(); // Disable output caching

  // Settings    
  $address = "localhost";
  $port = 5000;

  /*
    function socket_create(int $domain, int $type, int $protocol)
    $domain can be AF_INET, AF_INET6 for IPV6 , AF_UNIX for local communication protocol
    $protocol can be SOL_TCP, SOL_UDP (TCP/UDP)
    @returns true on success
  */
  if (($serverSocket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
    echo "Couldn't create socket" . socket_strerror(socket_last_error()) . "\n";
  }

  /*
    socket_bind(resource $socket, string $address[, int $port = 0])
    Bind socket to listen to address and port
  */
  socket_bind($serverSocket, $address, $port) or die("Unable to bind address.\n");

  if (socket_listen($serverSocket, 5) === false) {
    echo "Listen Failed " . socket_strerror(socket_last_error($serverSocket)) . "\n";
  }

  socket_listen($serverSocket, 5);
  echo("Listening in $address:$port\n");

  $client = socket_accept($serverSocket);

  // Read 1600 bytes from client
  $input = socket_read($client, 1500);
  
  $httpRequestLines = explode("\r\n", $input);
  $requestLine = $httpRequestLines[0];
  
  // If the request is a GET at the root "localhost/"
  if (strpos($requestLine, "GET / ") !== false) {
    $env_variables = "ANSIBLE_CALLBACK_WHITELIST=json ANSIBLE_STDOUT_CALLBACK=json ";
    $output = shell_exec($env_variables . "ansible-playbook -i inventory.ini ping.yml");
    
    socket_write($client, 
      "HTTP/1.1 200 OK\r\n" .
      "Content-Type: text/html;charset=UTF-8\r\n" .
      "Access-Control-Allow-Origin: *\r\n\r\n" .
      $output
    );
  }

  socket_close($serverSocket);
  socket_close($client);
?>