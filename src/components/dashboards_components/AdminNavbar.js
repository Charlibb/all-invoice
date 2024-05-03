import { useLocation } from "react-router-dom";
import Button from "@material-tailwind/react/Button";
import Image from '@material-tailwind/react/Image';
import Icon from "@material-tailwind/react/Icon";
import { useState } from "react";

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
  const [userPhoto, setUserPhoto] = useState('https://all-invoice-app.herokuapp.com/user'); //otherwise http://localhost:5000
  const location = useLocation().pathname;
  const handleError = () => {
    setUserPhoto('https://all-invoice-app.herokuapp.com/img') //otherwise http://localhost:5000
  }
  return (
    <nav className="bg-gradient-to-tr from-blue-500 to-blue-800 py-6 px-3 h-60">
      <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        <div className="md:hidden">
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            iconOnly
            rounded
            ripple="light"
            onClick={() => setShowSidebar("left-0")}
          >
            <Icon name="menu" size="2xl" color="white" />
          </Button>
          <div
            className={`absolute top-2 md:hidden ${
              showSidebar === "left-0" ? "left-64" : "-left-64"
            } z-50 transition-all duration-300`}
          >
            <Button
              color="transparent"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar("-left-64")}
            >
              <Icon name="close" size="2xl" color="white" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase text-white text-2xl tracking-widest mt-1">
         {location === "/accountsettings" ? "Account Settings" : location === "/createinvoice" ? "Create Invoice" :location === "/myinvoices" ?"My Invoices" : location.toUpperCase().replace("/", "")} 
          </h4>
          <div className="mb-2">
            <Image
              src={userPhoto}
              onError={handleError}
              rounded={true}
              raised={true}
              width='60px'
              alt="User Image"
            />
          </div>
          {/* <Button className="uppercase text-white text-xl mt-1 bg-blue-500 p-2">{state.user.fName}</Button> */}
        </div>
      </div>
    </nav>
  );
}
