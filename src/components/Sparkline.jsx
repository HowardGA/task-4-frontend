import { Sparklines, SparklinesLine } from 'react-sparklines';

const Sparkline = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <Sparklines data={data} width={100} height={20}>
      <SparklinesLine color="blue" style={{ fill: "none" }} />
    </Sparklines>
  );
};

export default Sparkline;
