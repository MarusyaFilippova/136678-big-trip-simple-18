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

const getDestinations = () => DESTINATIONS;

export {getDestinations};
