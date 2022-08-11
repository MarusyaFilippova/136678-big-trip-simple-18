const OFFER_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {id: 1, title: 'Upgrade to a business class', price: 190},
      {id: 2, title: 'Choose the radio station', price: 30},
      {id: 3, title: 'Choose temperature', price: 170},
      {id: 4, title: 'Drive quickly, I\'m in a hurry', price: 100},
      {id: 5, title: 'Drive slowly', price: 110}
    ]
  }, {
    type: 'bus',
    offers: [
      {id: 1, title: 'Infotainment system', price: 50},
      {id: 2, title: 'Order meal', price: 100},
      {id: 3, title: 'Choose seats', price: 190}
    ]
  }, {
    type: 'train',
    offers: [
      {id: 1, title: 'Book a taxi at the arrival point', price: 110},
      {id: 2, title: 'Order a breakfast', price: 80},
      {id: 3, title: 'Wake up at a certain time', price: 140}
    ]
  }, {
    type: 'flight',
    offers: [
      {id: 1, title: 'Choose meal', price: 120},
      {id: 2, title: 'Choose seats', price: 90},
      {id: 3, title: 'Upgrade to comfort class', price: 120},
      {id: 4, title: 'Upgrade to business class', price: 120},
      {id: 5, title: 'Add luggage', price: 170},
      {id: 6, title: 'Business lounge', price: 160}]
  }, {
    type: 'check-in',
    offers: [
      {id: 1, title: 'Choose the time of check-in', price: 70},
      {id: 2, title: 'Choose the time of check-out', price: 190},
      {id: 3, title: 'Add breakfast', price: 110}, {id: 4, title: 'Laundry', price: 140},
      {id: 5, title: 'Order a meal from the restaurant', price: 30}
    ]
  }, {
    type: 'sightseeing',
    offers: []
  }, {
    type: 'ship',
    offers: [
      {id: 1, title: 'Choose meal', price: 130},
      {id: 2, title: 'Choose seats', price: 160},
      {id: 3, title: 'Upgrade to comfort class', price: 170},
      {id: 4, title: 'Upgrade to business class', price: 150},
      {id: 5, title: 'Add luggage', price: 100},
      {id: 6, title: 'Business lounge', price: 40}
    ]
  }, {
    type: 'drive',
    offers: [
      {id: 1, title: 'With automatic transmission', price: 110},
      {id: 2, title: 'With air conditioning', price: 180}
    ]
  }, {
    type: 'restaurant',
    offers: [
      {id: 1, title: 'Choose live music', price: 150},
      {id: 2, title: 'Choose VIP area', price: 70}
    ]
  }
];

const DESTINATIONS = [
  {
    id: 1,
    name: 'Chamonix',
    description: 'Chamonix, is a beautiful city, with crowded streets, middle-eastern paradise, a perfect place to stay with a family.',
    pictures: [
      {src: 'http://picsum.photos/300/200?r=0.20434991385829115', description: 'Chamonix central station'},
      {src: 'http://picsum.photos/300/200?r=0.8638836483962766', description: 'Chamonix street market'},
      {src: 'http://picsum.photos/300/200?r=0.8794409773316758', description: 'Chamonix park'},
      {src: 'http://picsum.photos/300/200?r=0.019473515650567652', description: 'Chamonix kindergarten'},
      {src: 'http://picsum.photos/300/200?r=0.9496386611944037', description: 'Chamonix embankment'},
      {src: 'http://picsum.photos/300/200?r=0.5962118201437876', description: 'Chamonix embankment'},
      {src: 'http://picsum.photos/300/200?r=0.4672690269666413', description: 'Chamonix biggest supermarket'}
    ]
  }, {
    id: 2,
    name: 'Geneva',
    description: 'Geneva, a true asian pearl, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.',
    pictures: [
      {src: 'http://picsum.photos/300/200?r=0.6179123908812412', description: 'Geneva park'},
      {src: 'http://picsum.photos/300/200?r=0.7532224831932668', description: 'Geneva biggest supermarket'},
      {src: 'http://picsum.photos/300/200?r=0.7786792066048429', description: 'Geneva zoo'},
      {src: 'http://picsum.photos/300/200?r=0.8643884825956272', description: 'Geneva street market'},
      {src: 'http://picsum.photos/300/200?r=0.4964808557218241', description: 'Geneva parliament building'},
      {src: 'http://picsum.photos/300/200?r=0.1320929842780001', description: 'Geneva street market'},
      {src: 'http://picsum.photos/300/200?r=0.8158002792741204', description: 'Geneva kindergarten'},
      {src: 'http://picsum.photos/300/200?r=0.11820965860006827', description: 'Geneva city centre'}
    ]
  }, {
    id: 3,
    name: 'Amsterdam',
    description: 'Amsterdam, with crowded streets, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.',
    pictures: [
      {src: 'http://picsum.photos/300/200?r=0.27928110138297857', description: 'Amsterdam zoo'},
      {src: 'http://picsum.photos/300/200?r=0.16088143924583043', description: 'Amsterdam parliament building'},
      {src: 'http://picsum.photos/300/200?r=0.27106809798774667', description: 'Amsterdam embankment'},
      {src: 'http://picsum.photos/300/200?r=0.3371875539133755', description: 'Amsterdam kindergarten'}
    ]
  }, {
    id: 4,
    name: 'Helsinki',
    description: 'Helsinki, with crowded streets, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {src: 'http://picsum.photos/300/200?r=0.7806612056662707', description: 'Helsinki central station'},
      {src: 'http://picsum.photos/300/200?r=0.2552409368449433', description: 'Helsinki street market'},
      {src: 'http://picsum.photos/300/200?r=0.20153086446299717', description: 'Helsinki zoo'},
      {src: 'http://picsum.photos/300/200?r=0.09186367573367771', description: 'Helsinki embankment'},
      {src: 'http://picsum.photos/300/200?r=0.5973341647199848', description: 'Helsinki street market'},
      {src: 'http://picsum.photos/300/200?r=0.9836439270914741', description: 'Helsinki city centre'},
      {src: 'http://picsum.photos/300/200?r=0.6367204813840557', description: 'Helsinki street market'}
    ]
  }, {
    id: 5,
    name: 'Oslo',
    description: 'Oslo, with a beautiful old town, with an embankment of a mighty river as a centre of attraction.',
    pictures: [
      {src: 'http://picsum.photos/300/200?r=0.20428545470150428', description: 'Oslo kindergarten'},
      {src: 'http://picsum.photos/300/200?r=0.9086528829897003', description: 'Oslo park'},
      {src: 'http://picsum.photos/300/200?r=0.1949162997190319', description: 'Oslo embankment'},
      {src: 'http://picsum.photos/300/200?r=0.28045967487824086', description: 'Oslo central station'},
      {src: 'http://picsum.photos/300/200?r=0.4004033432713432', description: 'Oslo zoo'},
      {src: 'http://picsum.photos/300/200?r=0.790833532514148', description: 'Oslo city centre'}
    ]
  }
];

const OfferName = {

}

export {DESTINATIONS, OFFER_TYPES, OFFERS};
