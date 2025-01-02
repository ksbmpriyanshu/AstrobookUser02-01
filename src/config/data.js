import { useTranslation } from "react-i18next";
export const actions = [
  // {
  //   title: 'Camera',
  //   type: 'capture',
  //   options: {
  //     maxWidth: 300,
  //     maxHeight: 300,
  //     // saveToPhotos: true,
  //     mediaType: 'photo',
  //     includeBase64: true,
  //     quality: 0.2,
  //   },
  // },
  {
    title: 'Gallery',
    type: 'library',
    options: {
      maxWidth: 1024,
      maxHeight: 1024,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.2,
    },
  },
];

export const signData = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      img: require('../assets/images/rashi/1.png'),
      text: t("Aries"),
    },
    {
      id: 2,
      img: require('../assets/images/rashi/2.png'),
      text: t("Taurus"),
    },
    {
      id: 3,
      img: require('../assets/images/rashi/3.png'),
      text: t('Gemini'),
    },
    {
      id: 4,
      img: require('../assets/images/rashi/4.png'),
      text: t('Cancer'),
    },
    {
      id: 5,
      img: require('../assets/images/rashi/5.png'),
      text: t('Leo'),
    },
    {
      id: 6,
      img: require('../assets/images/rashi/6.png'),
      text: t('Virgo'),
    },
    {
      id: 7,
      img: require('../assets/images/rashi/7.png'),
      text: t('Libra'),
    },
    {
      id: 8,
      img: require('../assets/images/rashi/8.png'),
      text: t('Scorpio'),
    },
    {
      id: 9,
      img: require('../assets/images/rashi/9.png'),
      text: t('Sagittarius'),
    },
    {
      id: 10,
      img: require('../assets/images/rashi/10.png'),
      text: t('Capricorn'),
    },
    {
      id: 11,
      img: require('../assets/images/rashi/11.png'),
      text: t('Aquarius'),
    },
    {
      id: 12,
      img: require('../assets/images/rashi/12.png'),
      text: t('Pisces'),
    },
  ];
};

export const tarot_card = [
  {
    id: 1,
    img: require('../assets/images/themagician.png'),
    text: 'The Magician',
  },
  {
    id: 2,
    img: require('../assets/images/thehierophant.png'),
    text: 'The Hierophant',
  },
  {
    id: 3,
    img: require('../assets/images/theemperor.png'),
    text: 'The Emperor',
  },
  {
    id: 4,
    img: require('../assets/images/thefool.png'),
    text: 'The Fool',
  },
  {
    id: 5,
    img: require('../assets/images/thehermit.png'),
    text: 'The Hermit',
  },
  {
    id: 6,
    img: require('../assets/images/thedevil.png'),
    text: 'The Devil',
  },
  {
    id: 7,
    img: require('../assets/images/temperance.png'),
    text: 'Temperance',
  },
  {
    id: 8,
    img: require('../assets/images/thefool.png'),
    text: 'The Fool',
  },
  {
    id: 9,
    img: require('../assets/images/thechariot.png'),
    text: 'The Chariot',
  },
  {
    id: 10,
    img: require('../assets/images/justice.png'),
    text: 'Justice',
  },
  {
    id: 11,
    img: require('../assets/images/thejudgment.png'),
    text: 'The Judgment',
  },
  {
    id: 12,
    img: require('../assets/images/theempress.png'),
    text: 'The Empress',
  },
  {
    id: 13,
    img: require('../assets/images/thestar.png'),
    text: 'The Star',
  },
  {
    id: 14,
    img: require('../assets/images/themoon.png'),
    text: 'The Moon',
  },
  {
    id: 15,
    img: require('../assets/images/thelovers.png'),
    text: 'The Lovers',
  },
  {
    id: 16,
    img: require('../assets/images/thesun.png'),
    text: 'The Sun',
  },
  {
    id: 17,
    img: require('../assets/images/thehangedman.png'),
    text: 'The Hanged Man',
  },
  {
    id: 18,
    img: require('../assets/images/thetower.png'),
    text: 'The Tower',
  },
  {
    id: 19,
    img: require('../assets/images/theworld.png'),
    text: 'The World',
  },
  {
    id: 20,
    img: require('../assets/images/thehighpriestess.png'),
    text: 'The High Priestess',
  },
];

export const astrologer_experties = [
  {
    id: 1,
    label: 'Tarot Card Reader',
    value: '4',
  },
  {
    id: 2,
    label: 'Marriage Making',
    value: '19',
  },
  {
    id: 3,
    label: 'Kundali Matching',
    value: '12',
  },
  {
    id: 4,
    label: 'Holistic Therapist',
    value: '15',
  },
  {
    id: 5,
    label: 'Vedic Astrology',
    value: '6',
  },
  {
    id: 6,
    label: 'Numerology',
    value: '7',
  },
  {
    id: 7,
    label: 'Palmistry',
    value: '8',
  },
  {
    id: 8,
    label: 'Spiritual Healing',
    value: '16',
  },
  {
    id: 9,
    label: 'Nadi Astrology',
    value: '10',
  },
  {
    id: 9,
    label: 'Lal Kitaab Astrology',
    value: '13',
  },
  {
    id: 10,
    label: 'Prashna kundli',
    value: '9',
  },
  {
    id: 11,
    label: 'Vastu Shastra',
    value: '11',
  },
  {
    id: 12,
    label: 'KP Astrology',
    value: '14',
  },
  {
    id: 13,
    label: 'Devil',
    value: '22',
  },
  {
    id: 14,
    label: 'Psychic',
    value: '23',
  },
  {
    id: 15,
    label: 'Face Reading',
    value: '18',
  },
  {
    id: 16,
    label: 'Raman Shastra',
    value: '17',
  },
  {
    id: 17,
    label: 'Muhurta',
    value: '20',
  },
  {
    id: 18,
    label: 'Jaimini Astrology',
    value: '21',
  },
];

export const basics_data = [
  {id: 1, title: 'Female', img: require('../assets/images/female.png')},
  {id: 2, title: 'Single', img: require('../assets/images/single.png')},
  {id: 3, title: 'Management', img: require('../assets/images/manager.png')},
  {id: 4, title: 'Christian', img: require('../assets/images/christian.png')},
  {id: 5, title: 'Bengali', img: require('../assets/images/bengali.png')},
  {id: 6, title: 'Bachelor\'s', img: require('../assets/images/graduation-cap.png')},
  {id: 7, title: 'Technology', img: require('../assets/images/technical-support.png')},
  {id: 8, title: '1 Year', img: require('../assets/images/portfolio.png')},
  {id: 9, title: 'Occasional', img: require('../assets/images/opportunity.png')},
  {id: 10, title: 'Never', img: require('../assets/images/traffic-signal.png')},
];
