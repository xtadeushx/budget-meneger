
interface IRadioButtonProps {
  name: string,
  value: string,
  text: string

}

const RadioButton: React.FC<IRadioButtonProps> = ({ name, value, text }) => {
  return (
    <label className="cursor-pointer flex items-center gap-2">
      <input
        type="radio"
        name={name}
        value={value}
        className="form-radio text-blue-600"
      />
      <span>{text}</span>
    </label>
  )
}

export { RadioButton };

