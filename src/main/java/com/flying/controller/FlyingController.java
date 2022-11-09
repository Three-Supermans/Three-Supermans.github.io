package com.flying.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@Api(tags = "首页")
@RestController
public class FlyingController {

    @GetMapping("/")
    @ApiOperation(value = "首页")
    public String index() {

        return "hello world !";
    }
}
