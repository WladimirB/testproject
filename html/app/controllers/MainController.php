<?php
include ROOT.'/app/models/model.php';


class MainController {
    protected $model;

    public function __construct()
    {
      $this->model = new Model();
    }

    public function index()
    {
      include(ROOT.'/index.html');
    }

    public function load()
    {
      $file = file_get_contents("https://api.coingecko.com/api/v3/global");
      $result = json_decode($file,true,4,JSON_OBJECT_AS_ARRAY);
      if ($result) {
        $this->model->appendData($result,'market_cap_percentage');
        $response = 'result ok';
      } else {
        $response = 'Data is not loaded';
      }
      echo $response;
    }

    public function getData()
    {
      $dataToGet['model'] = $this->model->getData();
      echo json_encode($dataToGet);
    }

}
