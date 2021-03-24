<?php

class Model {
  private PDO $pdo;
  private $error;
  private PDOStatement $insert;

  public function __construct()
  {
    $host = "mysql-server";
    $user = "root";
    $pass = "secret";
    $db = "testproject";
    try {
        $this->pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     } catch(PDOException $e) {
        $this->error = $e->getMessage();
    }
  }

  public function appendData(array $data,string $key)
  {
    $search = $this->searchIn($data,$key);
    if(!$search) {
      return;
    }
    $this->set();
    try{
      array_walk_recursive($search,'self::insertData',$this->insert);
    } catch(PDOException $e){
      //Если при попытке выполнения запроса нет нужной таблицы,перехватываем исключение и создаём ёё
      if($e->getCode() == "42S02") {
        $this->init();
        array_walk_recursive($search,'self::insertData',$this->insert);
      }
    }

  }

  public function getData()
  {
    $stmt = $this->pdo->prepare('SELECT * FROM `cryptocurrency`');
    $stmt->execute();
    return $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getError(){
    if($this->error) {
      return $this->error;
    }
    return false;
  }

  private function insertData($key,$value,$stmt)
  {
    $stmt->execute(array('cryptocurrency'=>$value,'percentage' => $key));
  }

  private function init()
  {
    $this->pdo->exec('CREATE TABLE IF NOT EXISTS `cryptocurrency`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `cryptocurrency` VARCHAR(255) NOT NULL,
    `percentage` DOUBLE(255,30) UNSIGNED NOT NULL)' );
  }

  private function set()
  {
    $this->insert = $this->pdo->prepare('INSERT INTO `cryptocurrency`
      (`cryptocurrency`,`percentage`) VALUES (:cryptocurrency,:percentage)',
      array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
  }

  private function searchIn(array $data,string $key_search)
  {
    $result = false;
    if(key_exists($key_search,$data)){
      return $result = $data[$key_search];
    }
    foreach ($data as $key => $value) {
       if(is_array($value) && key_exists($key_search,$value)) {
         return $result = $value[$key_search];
       } elseif (is_array($value)) {
          foreach ($value as $k => $v) {
            if(is_array($v) && key_exists($key_search,$v)) {
              return $result = $v[$key_search];
            }
          }
       } elseif (!$result) {
         return null;
       }
    }
  }
}
