type TIconProps = {
  fillColor?: string;
  childColor?: string;
};

export const IconFailed = ({ fillColor = '#B780DB', childColor = 'white' }: TIconProps) => {
  return (
    <svg width="46" height="40" viewBox="0 0 46 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M45.1582 28.6803H39.8081C41.4356 25.3992 42.1888 21.6074 41.7386 17.6078C40.7171 8.43132 33.298 1.06413 24.1215 0.111851C16.4166 -0.693259 9.4823 2.91675 5.54332 8.72566L0.929084 8.64775C0.219202 8.63909 -0.230967 9.40092 0.123974 10.0156L2.81633 14.6731C2.08914 17.3741 1.89868 20.3002 2.42676 23.3302C3.8725 31.7016 10.677 38.3329 19.083 39.5276C25.697 40.4712 31.809 38.1425 36.025 33.9351C36.025 33.9351 36.0336 33.9351 36.0423 33.9351C38.0594 32.0739 42.1628 30.6195 45.3054 29.7191C45.9027 29.546 45.7729 28.6716 45.1495 28.6716L45.1582 28.6803Z"
        fill={fillColor}
      />
      <path
        d="M28.2738 9.4545L11.4846 25.953C10.6685 26.755 10.6685 28.0553 11.4846 28.8573L13.2045 30.5474C14.0207 31.3494 15.3439 31.3494 16.16 30.5474L32.9492 14.0489C33.7654 13.2469 33.7654 11.9466 32.9492 11.1446L31.2293 9.4545C30.4132 8.65249 29.09 8.65249 28.2738 9.4545Z"
        fill={childColor}
      />
      <path
        d="M11.4776 14.0462L28.2668 30.5447C29.083 31.3467 30.4062 31.3467 31.2223 30.5447L32.9422 28.8545C33.7584 28.0525 33.7584 26.7522 32.9422 25.9502L16.153 9.45173C15.3369 8.64973 14.0137 8.64973 13.1975 9.45173L11.4776 11.1418C10.6615 11.9439 10.6615 13.2442 11.4776 14.0462Z"
        fill={childColor}
      />
    </svg>
  );
};
