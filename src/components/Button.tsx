interface ButtonProps {
  title: string;
  action?: () => void;
  primary?: boolean;
  disabled?: boolean;
  name?: string;
}

const Button = ({
  title,
  action,
  primary = false,
  disabled = false,
  name
}: ButtonProps) => {
  const buttonClass = primary ? "primary_btn" : "outline_btn";

  return (
    <button
      type="submit"
      onClick={action}
      name={name}
      className={`btn ${buttonClass}`}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;