import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaBeer, FaEdit } from "react-icons/fa";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
// import "./styles.css";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  // const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [transactionType, setTransactionType] = useState("expense");
  const [loading, setLoading] = useState(false);

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (description !== "" && transactionAmount !== null) {
      addTransaction({
        description,
        transactionAmount,
        transactionType,
      });
    } else {
      <Alert status="error">
        <AlertIcon />
        Please fill all the details.
      </Alert>;
    }

    setDescription("");
    setTransactionAmount(null);
    setLoading(false);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack
      bg={"#06051d"}
      // w={"100%"}
      minH={"100vh"}
      // direction={["column", "row"]}
      alignItems={"center"}
      justifyContent={"center"}
      pt={5}
      pb={5}
    >
      <Card
        w={["98%", "98%", "95%"]}
        h={[null, null, "auto"]}
        bg={"#06051d"}
        color={"#fff"}
        borderBottom={"2px solid violet"}
      >
        <CardHeader>
          <Heading size="md">{name}'s Expense Tracker</Heading>
        </CardHeader>

        <Stack direction={["column", "row"]}>
          <CardBody order={[2, 2, 2, 1]}>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Your Balance
                </Heading>
                {balance >= 0 ? (
                  <Text pt="2" fontSize="sm">
                    {" "}
                    ${balance}
                  </Text>
                ) : (
                  <Text pt="2" fontSize="sm">
                    {" "}
                    -${balance * -1}
                  </Text>
                )}
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Income/ Earnings
                </Heading>
                <Text pt="2" fontSize="sm">
                  ${income}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Expenses
                </Heading>
                <Text pt="2" fontSize="sm">
                  ${expenses}
                </Text>
              </Box>
            </Stack>
          </CardBody>

          <Image
            order={[1, 1, 1, 2]}
            objectFit="cover"
            height="250px"
            width="250px"
            borderRadius={"full"}
            src={profilePhoto}
            alt="google-profile"
          />
        </Stack>

        <CardFooter
          flexDirection={["column", "row"]}
          alignItems={["center"]}
          justifyContent={["center", "space-evenly"]}
        >
          <Stack
            direction={["column", "column", "column", "row"]}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={4}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaEdit color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Enter description"
                value={description}
                required
                maxLength={100}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="$"
              />
              <Input
                type="number"
                placeholder="Enter amount"
                value={transactionAmount}
                required
                maxLength={100}
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
              {/* <InputRightElement>
                <FaBeer color="green.500" />
              </InputRightElement> */}
            </InputGroup>

            <RadioGroup defaultValue="2">
              <Stack spacing={5} direction="row">
                <Radio
                  colorScheme="red"
                  size="lg"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  Expense
                </Radio>
                <Radio
                  colorScheme="green"
                  size="lg"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  Income
                </Radio>
              </Stack>
            </RadioGroup>

            <Box>
              <Button
                // size={"sm"}
                isLoading={loading}
                loadingText="Adding Transaction"
                colorScheme="teal"
                variant="outline"
                onClick={onSubmit}
              >
                Add Transaction
              </Button>
            </Box>
          </Stack>
        </CardFooter>
      </Card>

      <Card
        w={["80%", "80%", "80%"]}
        h={["300px"]}
        overflowY={"auto"}
        bg={"#06051d"}
        color={"#fff"}
        borderBottom={"2px solid violet"}
      >
        <CardHeader>
          <Heading size="md">Transactions Summary</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {transactions.map((transaction) => {
              const { description, transactionAmount, transactionType } =
                transaction;
              return (
                <Box>
                  <Heading
                    size="xs"
                    textTransform="uppercase"
                    color={transactionType === "expense" ? "red" : "green"}
                  >
                    {transactionType}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {description}
                  </Text>
                  <Text pt="2" fontSize="sm">
                    ${transactionAmount}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
