<?php
  set_time_limit(0); // disable timeout
  ob_implicit_flush(); // disable output caching 

  // Settings    
  $address = 'localhost';
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
  socket_bind($serverSocket, $address, $port) or die('Não foi possível vincular ao endereço.');

  if (socket_listen($serverSocket, 5) === false) {
    echo "Listen Failed " . socket_strerror(socket_last_error($serverSocket)) . "\n";
  }

  socket_listen($serverSocket, 5);
  echo("Listening...\n");

  $client = socket_accept($serverSocket);

  // Read 1600 bytes from client
  $input = socket_read($client, 1600);

  $data = json_decode(explode("\n", $input)[18]) or die('Não foi possível pegar os dados da requisição.');

  /* Força o fechamento da conexão */
  $linger = array('l_linger' => 0, 'l_onoff' => 1);
  socket_set_option($serverSocket, SOL_SOCKET, SO_LINGER, $linger);
  socket_set_option($client, SOL_SOCKET, SO_LINGER, $linger);

  socket_close($serverSocket);
  socket_close($client);
?>