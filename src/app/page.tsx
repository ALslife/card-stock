import InputForm from "./_components/input";

const Home: React.FC = () => {
  const inputFields = [
    { label: "ユーザー名" },
    { label: "メールアドレス" },
  ];

  return (
    <main className="pr-10 pl-10 mr-auto ml-auto w-full max-w-[750px]">
      {inputFields.map((field, index) => (
        <div key={index} className={index < inputFields.length - 1 ? "mb-8" : ""}>
          <InputForm label={field.label} />
        </div>
      ))}
    </main>
  );
};

export default Home;
