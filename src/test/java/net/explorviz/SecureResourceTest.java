package net.explorviz;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class SecureResourceTest {

    @Test
    public void testHelloEndpoint() {
        given()
          .when().get("/secret")
          .then()
             .statusCode(200)
             .body(is("{\"theSecret\": \"This is a secret page\"}"));
    }

}