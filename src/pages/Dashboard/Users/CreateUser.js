import Forms from "../../../Components/Forms/Form";

export default function CreateUser() {
  return (
    <div className="parent">
      <Forms
        endPoint="user/create"
        navigate="dashboard/users"
        buttonStyle={true}
        button="Create"
      />
    </div>
  );
}
