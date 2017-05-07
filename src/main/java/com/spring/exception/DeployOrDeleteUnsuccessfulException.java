package com.spring.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR,reason= "部署或取消部署失败")
public class DeployOrDeleteUnsuccessfulException extends RuntimeException{

}
/*
@ControllerAdvice
@RestController
public class CustomExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> emptyResultHandler() {
        Map<String, String> map = new HashMap<String, String>();
        map.put("status", "error");
        map.put("message", "用户名或密码错误！");
        return map;
    }
}
*/

/*
@ResponseStatus(value=HttpStatus.FORBIDDEN,reason="用户不匹配")
public class UserNotMatchException extends RuntimeException{


}

*/