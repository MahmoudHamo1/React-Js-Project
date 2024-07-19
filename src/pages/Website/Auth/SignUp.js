import Forms from "../../../Components/Forms/Form";
import Header from "../../../Components/Header";

export default function SignUp() {
  return (
    <div>
      <Header />
      <div
        className="parent"
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Forms
          button="register"
          endPoint="register"
          navigate=""
          styleRegister={true}
          //buttonstyle={true}
        />
      </div>
    </div>
  );
}
