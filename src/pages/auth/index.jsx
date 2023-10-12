import { Button, Stack, Text } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase-config";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <Stack
      direction={["column"]}
      alignItems={"center"}
      justifyContent={"center"}
      textAlign={"center"}
      className="login-page"
    >
      <Text fontSize={["3xl", "5xl", "7xl"]} fontFamily={"cursive"} mb={5}>
        Sign In With Google to Continue
      </Text>
      <Button
        leftIcon={<FcGoogle size={20} />}
        bg={"#fff"}
        color={"#000"}
        variant="solid"
        fontSize={"lg"}
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </Button>
    </Stack>
  );
};
