
interface Props {
  onClick(): void;
  value: string;
}

export default function Cell(props: Props) {
  const { onClick, value } = props;
  return (
    <div
      onClick={onClick}
      className="border h-[160px] grid place-content-center text-5xl font-bold"
    >
      {value}
    </div>
  );
}
