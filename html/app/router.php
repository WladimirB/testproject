<?php
final class Router {
    private $routes;

    function __construct($routesPath){
        $this->routes = include_once($routesPath);
    }


    public function run(){
        $uri = $this->getURI();

        foreach($this->routes as $pattern => $route){
            if(preg_match("~$pattern~", $uri)){
                $internalRoute = preg_replace("~$pattern~", $route, $uri);
                $segments = explode('/', $internalRoute);
                $controllerName = ucfirst(array_shift($segments)).'Controller';
                $action = array_shift($segments);
                $parameters = $segments;

                $controllerFile = ROOT.'/app/controllers/'.$controllerName.'.php';

                if(file_exists($controllerFile)) {
                    include($controllerFile);
                }

                $controller = new $controllerName();

                if(!is_callable(array($controller, $action))){
                    header("HTTP/1.0 404 Not Found");
                    return;
                }

                $controller = new $controllerName();
                if (count($segments)>2) {
                  $params=array_slice($segments,2);
                } else {
                  $params = [];
                }
                $response = call_user_func_array(array($controller, $action), $params);
            }
            //header("HTTP/1.0 404 Not Found");
        }
    }

    private function getURI(){
      if(!empty($_SERVER['REQUEST_URI'])) {
      return trim($_SERVER['REQUEST_URI'],'/');
      }
    }

    private function notFound(){
      //ob_start();
      //include(ROOT.'/error.php');
      //return ob_end_flush();
    }
}
