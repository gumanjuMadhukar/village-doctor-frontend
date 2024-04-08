import Link from 'next/link';
import Colors from 'utils/colors';

type Props = {
  text: string;
  customStyle?: any;
  url?: string;
};
const CustomLink = (props: Props) => {
  const { text = 'Submit', customStyle = { color: Colors.PRIMARY, fontWeight: '600' }, url = '/' } = props;
  return (
    <Link
      style={{
        color: customStyle.color,
        fontWeight: customStyle?.fontWeight,
        padding: '0'
      }}
      href={url}
    >
      {text}
    </Link>
  );
};

export default CustomLink;
