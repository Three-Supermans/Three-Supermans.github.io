package com.flying;

import com.flying.controller.FlyingController;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class FlyingControllerTest {

    @Resource
    private FlyingController flyingController;
    @Test
    void testIndex(){
        assertThat(flyingController.index()).isEqualTo("hello world !");
    }

}
