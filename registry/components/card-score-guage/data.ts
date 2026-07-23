import type { CardScoreGaugeProps } from './component';

export const waterQualityScore: CardScoreGaugeProps = {
    title: 'ดัชนีคุณภาพน้ำ',
    score: 82,
    statusLabel: 'คุณภาพดี',
};

export const airQualityScore: CardScoreGaugeProps = {
    title: 'ดัชนีคุณภาพอากาศ',
    score: 58,
    statusLabel: 'ปานกลาง',
};

export const sensorUptimeScore: CardScoreGaugeProps = {
    title: 'ประสิทธิภาพระบบเซ็นเซอร์',
    score: 35,
    statusLabel: 'ควรปรับปรุง',
};
