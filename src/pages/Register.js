import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import { FaEye } from "react-icons/fa";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import SimpleFooter from "components/landing_components/SimpleFooter";
import Page from "components/landing_components/login/Page";
import Alert from "@material-tailwind/react/Alert";
import { useState } from "react";
import CardHeader from "@material-tailwind/react/CardHeader";
import H5 from "@material-tailwind/react/Heading5";

export default function Register() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [resp, setResp] = useState("");
  const [resCol, setResCol] = useState("lightGreen");
  const [togglep, setToggle] = useState("password");
  const [toggler, setToggler] = useState("password");

  if (resp) {
    setTimeout(() => {
      setResp("");
    }, 5000);
  }

  const registerWithEnter = (e) => {
    if (e.key === "Enter") {
      addUser(fName, lName, mail, pass, repass);
    }
  };

  const addUser = async (f, l, m, p, r) => {
    if (
      fName.trim() === "" ||
      lName.trim() === "" ||
      mail.trim() === "" ||
      pass.trim() === "" ||
      repass.trim() === ""
    ) {
      setResCol("deepOrange");
      setResp("Fill out all the Fields please!");
      return;
    } else {
      let user = {
        fName: f,
        lName: l,
        mail: m,
        pass: p,
        repass: r,
      };
      try {
        const response = await fetch("/register/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response) {
          const ans = await response.json();
          if (ans.message) {
            setResCol("deepOrange");
            setResp(ans.message.errors[0].msg);
            return;
          } else {
            setResCol("lightGreen");
            setResp(ans);
            setMail("");
            setFName("");
            setLName("");
            setPass("");
            setRepass("");
            return;
          }
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  return (
    <>
    <Page>
        <div className="max-w-xl m-auto p-2">
          <Card className="mt-4">
            <CardHeader color="lightBlue">
              <H5 color="white">
                Register
              </H5>
            </CardHeader>
            <CardBody>
              <div className="mb-4 sm:mb-0 px-4 sm:px-0">
                <InputIcon
                  type="text"
                  color="lightBlue"
                  placeholder="First Name"
                  iconName="account_circle"
                  onChange={(e) => setFName(e.target.value)}
                  value={fName}
                  required
                />
              </div>
              <div className="mb-4 sm:mb-0 px-4 sm:px-0">
                <InputIcon
                  type="text"
                  color="lightBlue"
                  placeholder="Last Name"
                  iconName="account_circle"
                  onChange={(e) => setLName(e.target.value)}
                  value={lName}
                  required
                />
              </div>
              <div className="mb-4 sm:mb-0 px-4 sm:px-0">
                <InputIcon
                  type="email"
                  color="lightBlue"
                  placeholder="Email Address"
                  iconName="email"
                  onChange={(e) => setMail(e.target.value)}
                  value={mail}
                  required
                />
              </div>
              <div className="relative mb-4 sm:mb-0 px-4 sm:px-0">
                <Input
                  type={togglep}
                  color="lightBlue"
                  placeholder="Password"
                  name="pass"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  required
                />
                <FaEye
                  className="absolute bottom-2 right-5 text-lg cursor-pointer sm:right-0"
                  color="grey"
                  onClick={() =>
                    setToggle(togglep === "password" ? "text" : "password")
                  }
                />
              </div>
              <div className="relative mb-6 px-4 sm:px-0">
                <Input
                  type={toggler}
                  color="lightBlue"
                  placeholder="Re-password"
                  name="repass"
                  onChange={(e) => setRepass(e.target.value)}
                  value={repass}
                  onKeyDown={(e) => registerWithEnter(e)}
                  required
                />
                <FaEye
                  className="absolute bottom-2 right-5 sm:right-0 text-lg cursor-pointer"
                  color="grey"
                  onClick={() =>
                    setToggler(toggler === "password" ? "text" : "password")
                  }
                />
              </div>
              <div className="m-auto">
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex justify-around">
                <Button
                  size="sm"
                  ripple="dark"
                  onClick={() => addUser(fName, lName, mail, pass, repass)}
                >
                  Register
                </Button>
                <a href="/login" color="lightBlue">
                  <Button
                    size="sm"
                  >Login here</Button>
                </a>
              </div>
            </CardFooter>
          </Card>
          <div className={resp ? "mt-2" : "invisible"}>
            <Alert color={resCol}>{resp}</Alert>
          </div>
      </div>
        

      <SimpleFooter className="md:mb-2" />
    </Page>
   
    </>
  );
}
