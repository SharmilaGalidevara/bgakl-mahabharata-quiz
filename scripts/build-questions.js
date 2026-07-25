/**
 * Builds data/questions.json from the BGAKL Mahabharata question bank (200 questions).
 * Run: node scripts/build-questions.js
 */

const fs = require("fs");
const path = require("path");

function opt(en, ta, correct) {
  return { english: en, tamil: ta, correct };
}

function q(id, questionEnglish, questionTamil, correctEn, correctTa, wrong) {
  return {
    id,
    questionEnglish,
    questionTamil,
    options: [
      opt(correctEn, correctTa, true),
      opt(wrong[0][0], wrong[0][1], false),
      opt(wrong[1][0], wrong[1][1], false),
      opt(wrong[2][0], wrong[2][1], false),
    ],
  };
}

const questions = [
  q(1, "Who wrote the Mahabharata composed by sage Veda Vyasa?", "வேதவியாச முனிவர் இயற்றிய மகாபாரதத்தை எழுதியவர் யார்?", "Lord Ganesha", "கணேச பகவான்", [["Valmiki", "வால்மீகி"], ["Narada", "நாரதர்"], ["Sage Vyasa", "வியாச முனிவர்"]]),

  q(2, "Where did Lord Brahma appear from?", "பிரம்ம தேவர் எங்கிருந்து தோன்றினார்?", "Navel of Lord Vishnu", "விஷ்ணு பகவானின் நாபியிலிருந்து", [["Lotus from Vishnu", "விஷ்ணுவின் தாமரையிலிருந்து"], ["Forehead of Shiva", "சிவனின் நெற்றியிலிருந்து"], ["Ocean of milk", "பால் கடலிலிருந்து"]]),

  q(3, "Whose son was King Janamejaya?", "ஜனமேஜய மன்னர் யாருடைய மகன்?", "Parikshit", "பரீக்ஷித்", [["Abhimanyu", "அபிமன்யு"], ["Shantanu", "சாந்தனு"], ["Dhritarashtra", "திருதராஷ்டிரர்"]]),

  q(4, "What was the capital of the kingdom ruled by Janamejaya?", "ஜனமேஜயர் ஆண்ட நாட்டின் தலைநகரம் எது?", "Hastinapura", "ஹஸ்தினாபுரம்", [["Indraprastha", "இந்திரபிரஸ்தம்"], ["Dwarka", "துவாரகா"], ["Kashi", "காசி"]]),

  q(5, "Whose daughter was Kadru?", "கத்ரு யாரின் மகள்?", "Daksha", "தட்ஷனின்", [["Vinata", "வினதா"], ["Aditi", "அதிதி"], ["Kunti", "குந்தி"]]),

  q(6, "Whose daughter was Vinata?", "வினதா யாரின் மகள்?", "Daksha", "தட்ஷனின்", [["Kadru", "கத்ரு"], ["Aditi", "அதிதி"], ["Satyavati", "சத்யவதி"]]),
  
  q(7, "Whose son was King Parikshit?", "பரீக்ஷித் மன்னர் யாருடைய மகன்?", "Abhimanyu", "அபிமன்யுவின்", [["Arjuna", "அர்ஜுனன்"], ["Janamejaya", "ஜனமேஜயர்"], ["Yudhishthira", "யுதிஷ்டிரர்"]]),

  q(8, "Which form did Lord Vishnu assume during the churning of the milk ocean?", "பாற்கடலைக் கடைந்தபோது ஸ்ரீ விஷ்ணு பகவான் எந்த ரூபத்தை ஏற்றிருந்தார்?", "Kurma", "கூர்மம்", [["Varaha", "வராகம்"], ["Narasimha", "நரசிம்மம்"], ["Mohini", "மோகினி"]]),
  
  q(9, "Which mountain was used during the churning of the milk ocean?", "பாற்கடலைக் கடைந்த சமயத்தில் எந்த மலை பயன்படுத்தப்பட்டது?", "Mt Mandara", "மந்தாரா மலை", [["Mt Meru", "மேரு மலை"], ["Himalaya", "இமயமலை"], ["Govardhan", "கோவர்த்தனம்"]]),
  
  q(10, "Who served as the churning rope for the milk ocean?", "பாற்கடலைக் கடையவதற்குக் கயிறாக யார் பயன்படுத்தப்பட்டார்?", "Vasuki", "வாசுகி", [["Ananta", "அனந்தன்"], ["Takshaka", "தட்ஷகன்"], ["Garuda", "கருடன்"]]),
  
  q(11, "Who consumed the Kaalakuta/Halahala poison that appeared from the churning of the milk ocean?", "பாற்கடலைக் கடைந்தபோது வந்த காலகூட/ஹலாஹல விஷத்தை அருந்தியது யார்?", "Lord Shiva", "சிவ பெருமான்", [["Vishnu", "விஷ்ணு"], ["Brahma", "பிரம்மா"], ["Indra", "இந்திரன்"]]),
  
  q(12, "Who is known as 'Neelakantha'?", "நீலகண்டன் என்று அழைக்கப்படுபவர் யார்?", "Lord Shiva", "சிவ பெருமான்", [["Vishnu", "விஷ்ணு"], ["Krishna", "கிருஷ்ணர்"], ["Brahma", "பிரம்மா"]]),
  
  q(13, "Who took the form of \"Mohini\" to distribute the nectar after the churning of the milk ocean?", "அமிர்தத்தைப் பகிர்வதற்காக மோகினி ரூபம் எடுத்தவர் யார்?", "Lord Vishnu", "விஷ்ணு பகவான்", [["Shiva", "சிவன்"], ["Brahma", "பிரம்மா"], ["Indra", "இந்திரன்"]]),
  
  q(14, "Which demon was beheaded by Lord Vishnu for drinking the nectar?", "அமிர்தத்தைக் குடித்ததற்காக எந்த அசுரனின் தலை வெட்டப்பட்டது?", "Rahu", "ராகு", [["Ketu", "கேது"], ["Hiranyakashipu", "ஹிரண்யகசிபு"], ["Viprachitti", "விப்ரசித்தி"]]),
  
  q(15, "Whose son is Garuda?", "கருடன் யாருடைய மகன்?", "Vinata's", "வினதாவின்", [["Kadru's", "கத்ருவின்"], ["Aditi's", "அதிதியின்"], ["Daksha's", "தட்ஷனின்"]]),
  
  q(16, "Who blessed Garuda that he would become immortal without drinking the nectar?", "அமிர்தம் அருந்தாமலே கருடன் அழியாதவனாக இருப்பான் என்று வரம் அளித்தவர் யார்?", "Lord Vishnu", "விஷ்ணு பகவான்", [["Indra", "இந்திரன்"], ["Shiva", "சிவன்"], ["Brahma", "பிரம்மா"]]),
  
  q(17, "Whose divine vehicle is Garuda?", "கருடன் எந்தத் தெய்வத்தின் வாகனமாக விளங்குகிறார்?", "Lord Vishnu", "விஷ்ணு பகவான்", [["Indra", "இந்திரன்"], ["Shiva", "சிவன்"], ["Agni", "அக்னி"]]),
  
  q(18, "Who directed Sheshanaga (Anantasesha) to raise the Earth on its hoods?", "அனந்தசேஷன் தன் தலைகளின் மீது பூமியைத் தாங்குமாறு உத்தரவிட்டவர் யார்?", "Lord Brahma", "பிரம்ம தேவர்", [["Vishnu", "விஷ்ணு"], ["Shiva", "சிவன்"], ["Indra", "இந்திரன்"]]),
  
  q(19, "Who cursed King Parikshit?", "பரீக்ஷித் மன்னரைச் சபித்தது யார்?", "Sage Shringi", "ஷ்ரிங்கி முனிவர்", [["Durvasa", "துர்வாசர்"], ["Vyasa", "வியாசர்"], ["Narada", "நாரதர்"]]),
  
  q(20, "Who was the father of sage Shringi?", "ஷ்ரிங்கி முனிவரின் தந்தை யார்?", "Shamika Rsi", "ஷமிகா ரிஷி", [["Vyasa", "வியாசர்"], ["Parashara", "பராசரர்"], ["Dhaumya", "தௌமியர்"]]),
  
  q(21, "Who performed the Sarpa yajna in order to avenge the death of King Parikshit?", "பரீக்ஷித் மன்னர் இறந்ததற்குப் பழிவாங்கும் வகையில் பாம்பு யாகம் நடத்தியவர் யார்?", "Janamejaya", "ஜனமேஜயர்", [["Yudhishthira", "யுதிஷ்டிரர்"], ["Dhritarashtra", "திருதராஷ்டிரர்"], ["Parikshit", "பரீக்ஷித்"]]),
  
  q(22, "Whose protection did Takshaka seek to protect himself from the Sarpa yajna?", "பாம்பு யாகத்திலிருந்து தன்னைக் காப்பாற்றிக் கொள்ள தட்ஷகன் யாரை அடைந்தான்?", "Indra Deva", "இந்திர தேவர்", [["Vishnu", "விஷ்ணு"], ["Shiva", "சிவன்"], ["Varuna", "வருணன்"]]),
  
  q(23, "Whose son was sage Vyasa Deva?", "வியாச தேவர் யாருடைய மகன்?", "Sage Parashara", "பராசர முனிவர்", [["Shantanu", "சாந்தனு"], ["Vasishtha", "வசிஷ்டர்"], ["Bharadwaja", "பரத்வாஜர்"]]),
  
  q(24, "What was the name of sage Vyasa Deva's mother?", "வியாச முனிவரின் தாயாரின் பெயர் என்ன?", "Satyavati", "சத்யவதி", [["Ganga", "கங்கா"], ["Kunti", "குந்தி"], ["Ambika", "அம்பிகா"]]),
  
  q(25, "Which of these sages killed all the Kshatriyas (warriors) on Earth twenty-one times?", "பூமியில் க்ஷத்திரியர்களை இருபத்தொரு முறை அழித்த முனிவர் யார்?", "Parasurama", "பரசுராமர்", [["Vyasa", "வியாசர்"], ["Vishwamitra", "விஸ்வாமித்ரர்"], ["Durvasa", "துர்வாசர்"]]),
  
  q(26, "Whose son was Hiranyakashipu?", "ஹிரண்யகசிபு யாருடைய மகன்?", "Diti", "திதி", [["Aditi", "அதிதி"], ["Kadru", "கத்ரு"], ["Vinata", "வினதா"]]),
  
  q(27, "Whose son was Prahlada?", "பிரஹலாதன் யாருடைய மகன்?", "Hiranyakashipu", "ஹிரண்யகசிபு", [["Hiranyaksha", "ஹிரண்யாட்சன்"], ["Ravana", "ராவணன்"], ["Kamsa", "கம்சன்"]]),
  
  q(28, "What was the name of Banasura's father?", "பாணாசுரனின் தந்தையின் பெயர் என்ன?", "Bali", "பாலி", [["Virochana", "விரோசனன்"], ["Prahlada", "பிரஹலாதன்"], ["Shukracharya", "சுக்ராசாரியர்"]]),
  
  q(29, "Which of these demons was born as Jarasandha?", "எந்த அசுரன் ஜராசந்தனாகப் பிறந்தார்?", "Viprachitti", "விப்ரசித்தி", [["Hiranyakashipu", "ஹிரண்யகசிபு"], ["Kalanemi", "காலநேமி"], ["Shishupala", "சிசுபாலன்"]]),
  
  q(30, "Hiranyakashipu was reborn as _________", "ஹிரண்யகசிபு மறுபிறவியில் யாராகப் பிறந்தார்?", "Shishupala", "சிசுபாலன்", [["Kamsa", "கம்சன்"], ["Duryodhana", "துரியோதனன்"], ["Jarasandha", "ஜராசந்தன்"]]),
  
  q(31, "Who was the demon Kalanemi reborn as?", "அசுரன் காலநேமி எந்த மனிதரின் உருவத்தில் மறுபிறவி எடுத்தார்?", "Kamsa", "கம்சன்", [["Shishupala", "சிசுபாலன்"], ["Duryodhana", "துரியோதனன்"], ["Jarasandha", "ஜராசந்தன்"]]),
  
  q(32, "Who was the father of Dronacharya?", "த்ரோணாசாரியரின் தந்தை யார்?", "Bharadwaja", "பரத்வாஜர்", [["Parashara", "பராசரர்"], ["Dhaumya", "தௌமியர்"], ["Kripacharya", "கிருபாசாரியர்"]]),
  
  q(33, "Whose son was Ashwatthama?", "அஷ்வத்தாமனின் தந்தை யார்?", "Dronacharya", "த்ரோணாசாரியர்", [["Kripacharya", "கிருபாசாரியர்"], ["Bhishma", "பீஷ்மர்"], ["Parashurama", "பரசுராமர்"]]),
  
  q(34, "Who were the parents of Bhishma?", "பீஷ்மரின் பெற்றோர் யார்?", "Shantanu - Ganga", "சாந்தனு - கங்கா", [["Shantanu - Satyavati", "சாந்தனு - சத்யவதி"], ["Pandu - Kunti", "பாண்டு - குந்தி"], ["Vichitravirya - Ambika", "விசித்ரவீர்யன் - அம்பிகா"]]),
  
  q(35, "Who was the younger brother of King Dhritarashtra?", "திருதராஷ்டிரரின் இளைய சகோதரர் யார்?", "Pandu", "பாண்டு", [["Vidura", "விதுரன்"], ["Bhishma", "பீஷ்மர்"], ["Duryodhana", "துரியோதனன்"]]),
  
  q(36, "Who was King Dhritarashtra's firstborn?", "திருதராஷ்டிரரின் முதல் புதல்வர் யார்?", "Duryodhana", "துரியோதனன்", [["Yudhishthira", "யுதிஷ்டிரர்"], ["Bhima", "பீமன்"], ["Dushasana", "துஷாசனன்"]]),
  
  q(37, "Who was the son of Dharma (Lord Yama)?", "தர்மராஜாவின் மகன் யார்?", "Yudhishthira", "யுதிஷ்டிரர்", [["Bhima", "பீமன்"], ["Arjuna", "அர்ஜுனன்"], ["Vidura", "விதுரன்"]]),
  
  q(38, "By whose divine powers was Bhima born?", "பீமன் யாருடைய தெய்வீக சக்தியால் பிறந்தார்?", "Vayu Deva", "வாயு தேவர்", [["Indra", "இந்திரன்"], ["Yama", "யமன்"], ["Ashwini Kumaras", "அஸ்வினி குமாரர்கள்"]]),
  
  q(39, "Which of these Pandavas was born by the divine powers of Indra?", "இந்திரனின் தெய்வீக சக்தியால் பிறந்த பாண்டவர் யார்?", "Arjuna", "அர்ஜுனன்", [["Yudhishthira", "யுதிஷ்டிரர்"], ["Bhima", "பீமன்"], ["Nakula", "நகுலன்"]]),
  
  q(40, "Which of the following were born by the divine powers of Ashwini Kumaras?", "அஸ்வினி குமாரர்களின் தெய்வீக சக்தியால் பிறந்தவர்கள் யார்?", "Nakula - Sahadeva", "நகுலன் - சகதேவன்", [["Yudhishthira - Bhima", "யுதிஷ்டிரர் - பீமன்"], ["Arjuna - Karna", "அர்ஜுனன் - கர்ணன்"], ["Bhima - Arjuna", "பீமன் - அர்ஜுனன்"]]),
  
  q(41, "What was the actual name of Kunti Devi?", "குந்தியின் உண்மையான பெயர் என்ன?", "Pritha", "ப்ரீதா", [["Kunti", "குந்தி"], ["Madri", "மாத்ரி"], ["Subhadra", "சுபத்ரா"]]),
  
  q(42, "Who was born as the son of Kunti Devi by the blessings of the Surya Deva?", "சூரிய தேவனின் அருளால் குந்தியின் மகனாகப் பிறந்தவர் யார்?", "Karna", "கர்ணன்", [["Arjuna", "அர்ஜுனன்"], ["Bhima", "பீமன்"], ["Yudhishthira", "யுதிஷ்டிரர்"]]),
  
  q(43, "Who demanded Karna's divine armour and earrings from him?", "கர்ணனிடமிருந்து அவரது தெய்வீக கவசமும் காது குண்டலங்களையும் தானமாகக் கேட்டவர் யார்?", "Lord Indra", "இந்திர தேவர்", [["Shiva", "சிவன்"], ["Krishna", "கிருஷ்ணர்"], ["Surya", "சூரியன்"]]),
  
  q(44, "Who was born as the son of Vasudeva?", "வசுதேவரின் மகனாகப் பிறந்தவர் யார்?", "Krishna", "கிருஷ்ணர்", [["Balarama", "பலராமர்"], ["Karna", "கர்ணன்"], ["Abhimanyu", "அபிமன்யு"]]),
  
  q(45, "Whose expansion is Sheshanaga (Anantasesha)?", "அனந்தசேஷன் யாருடைய அவதாரம்?", "Balarama", "பலராமர்", [["Krishna", "கிருஷ்ணர்"], ["Vishnu", "விஷ்ணு"], ["Garuda", "கருடன்"]]),
  
  q(46, "With which king did Shakuntala enter into a love-marriage?", "சகுந்தலை எந்த அரசருடன் காதல் திருமணம் செய்துகொண்டார்?", "Dushyanta", "துஷ்யந்தன்", [["Bharata", "பாரதன்"], ["Shantanu", "சாந்தனு"], ["Janaka", "ஜனகன்"]]),
  
  q(47, "After whom is India named?", "இந்தியா எந்த மன்னரின் பெயரால் அழைக்கப்படுகிறது?", "Bharata", "பாரதன்", [["Shakuntala", "சகுந்தலை"], ["Dushyanta", "துஷ்யந்தன்"], ["Yudhishthira", "யுதிஷ்டிரர்"]]),
  
  q(48, "Whose son was Bharata?", "பாரத மன்னரின் தாய் யார்?", "Shakuntala", "சகுந்தலை", [["Dushyanta", "துஷ்யந்தன்"], ["Ganga", "கங்கா"], ["Satyavati", "சத்யவதி"]]),
  
  q(49, "Whom did King Shantanu marry?", "சாந்தனு மன்னர் யாரை மணந்தார்?", "Ganga Devi", "கங்கா தேவி", [["Satyavati", "சத்யவதி"], ["Gandhari", "காந்தாரி"], ["Kunti", "குந்தி"]]),
  
  q(50, "How many sons of Shantanu did Ganga Devi drown in the river after giving birth to them?", "கங்கா தேவி, சாந்தனுவின் எத்தனை மகன்களைப் பிறந்ததும் நதியில் மூழ்கடித்தார்?", "7", "7", [["6", "6"], ["8", "8"], ["5", "5"]]),
];

// Continue with questions 51-100
const moreQuestions = [
  q(51, "A Vasu named 'Dhyo' was born as the son of Ganga Devi. By which name did he become famous?", "வசு தியோ எந்தப் பெயரால் புகழ் பெற்றார்?", "Devavrata", "தேவவ்ரதன்", [["Bhishma", "பீஷ்மர்"], ["Shantanu", "சாந்தனு"], ["Chitrangada", "சித்ரங்கதன்"]]),
  
  q(52, "Which river current did Devavrata stop with his arrows?", "தேவவ்ரதன் எந்த நதியைத் தடுத்தார்?", "Ganga", "கங்கா", [["Yamuna", "யமுனை"], ["Saraswati", "சaraswati"], ["Godavari", "கodavari"]]),
  
  q(53, "From whom did Devavrata learn the art of warfare?", "தேவவ்ரதன் போர் கலையை யாரிடம் கற்றுக் கொண்டார்?", "Parasurama", "பரசுராமர்", [["Dronacharya", "த்ரோணாசாரியர்"], ["Bhishma", "பீஷ்மர்"], ["Kripacharya", "கிருபாசாரியர்"]]),
  
  q(54, "What pledge did Devavrata undertake for the marriage of Shantanu and Satyavati?", "சாந்தனு-சத்யவதி திருமணத்திற்காக தேவவ்ரதன் என்ன உறுதி மேற்கொண்டார்?", "To remain a Brahmachari all his life", "வாழ்நாள் முழுவதும் பிரம்மachariயாக இருப்பது", [["To become king", "அரசனாக ஆட்சி செய்வது"], ["To marry Satyavati", "சத்யவதியை மணப்பது"], ["To leave Hastinapura", "ஹஸ்தினாபுரத்தை விட்டு செல்வது"]]),
  
  q(55, "By which name did Devavrata come to be known after his pledge?", "உறுதி மேற்கொண்ட பிறகு தேவவ்ரதன் எந்தப் பெயரால் அழைக்கப்பட்டார்?", "Bhishma", "பீஷ்மர்", [["Shantanu", "சாந்தனு"], ["Devavrata", "தேவவ்ரதன்"], ["Vidura", "விதுரன்"]]),
  
  q(56, "What boon did Shantanu grant Devavrata when he was pleased with his pledge?", "சாந்தனு தேவவ்ரதனுக்கு அளித்த வரம் என்ன?", "To die by his own will", "தன் விருப்பத்தால் இறக்க", [["Immortality", "அழியாமை"], ["Kingship", "அரசாட்சி"], ["Divine weapons", "தெய்வீக ஆயுதங்கள்"]]),
  
  q(57, "After marriage, which two sons were born to Satyavati?", "சத்யவதிக்குப் பிறந்த இரண்டு மகன்கள் யார்?", "Chitrangada – Vichitravirya", "சித்ரங்கதன் - விசித்ரவீர்யன்", [["Pandu - Dhritarashtra", "பாண்டு - திருதராஷ்டிரர்"], ["Bhishma - Vidura", "பீஷ்மர் - விதுரன்"], ["Duryodhana - Dushasana", "துரியோதனன் - துஷasanan"]]),
  
  q(58, "Who was crowned king of Hastinapura after the death of Shantanu?", "சாந்தனுவின் மரணத்திற்குப் பிறகு அரசனாக ஆட்சி செய்தவர் யார்?", "Chitrangada", "சித்ரங்கதன்", [["Vichitravirya", "விசித்ரவீர்யன்"], ["Bhishma", "பீஷ்மர்"], ["Pandu", "பாண்டு"]]),
  
  q(59, "Whose son was Babruvahana?", "பப்ருவாஹனனின் தந்தை யார்?", "Arjuna", "அர்ஜுனன்", [["Bhima", "பீமன்"], ["Yudhishthira", "யுதிஷ்டிரர்"], ["Krishna", "கிருஷ்ணர்"]]),
  
  q(60, "Who were the three daughters of the king of Kashi?", "காசி மன்னரின் மூன்று மகள்கள் யார்?", "Amba-Ambika-Ambalika", "அம்பா - அம்பிகா - அம்பாலிகா", [["Draupadi-Subhadra-Kunti", "திரௌபதி - சுபத்ரா - குந்தி"], ["Gandhari-Kunti-Madri", "காந்தாரி - குந்தி - மadri"], ["Satyavati-Ganga-Amba", "சத்யவதி - கங்கா - அம்பா"]]),
  
  q(61, "Who abducted the three daughters of the king of Kashi?", "காசி இளவரசிகளைக் கடத்தியவர் யார்?", "Bhishma", "பீஷ்மர்", [["Arjuna", "அர்ஜுனன்"], ["Dronacharya", "த்ரோணாசாரியர்"], ["Shantanu", "சாந்தனு"]]),
  
  q(62, "Whom had Amba, the eldest daughter of the king of Kashi, accepted as her husband in her mind?", "அம்பா மனதில் தேர்ந்தெடுத்த கணவர் யார்?", "Shalva", "சாlvaa", [["Bhishma", "பீஷ்மர்"], ["Vichitravirya", "விசித்ரவீர்யன்"], ["Drupada", "துrupaada"]]),
  
  q(63, "Which two daughters of the king of Kashi married Vichitravirya?", "விசித்ரவீர்யனை மணந்த காசி இளவரசிகள் யார்?", "Ambika-Ambalika", "அம்பிகா - அம்பாலிகா", [["Amba-Ambika", "அம்பா - அம்பிகா"], ["Amba-Ambalika", "அம்பா - அம்பாலிகா"], ["Ambika-Draupadi", "அம்பிகா - திரௌபதி"]]),
  
  q(64, "Who was the son of sage Vyasa and Ambika?", "வியாசரும் அம்பிகாவும் பெற்ற மகன் யார்?", "Dhritarashtra", "திருதராஷ்டிரர்", [["Pandu", "பாண்டு"], ["Vidura", "விதுரன்"], ["Bhishma", "பீஷ்மர்"]]),
  
  q(65, "Who was the son of sage Vyasa and Ambalika?", "வியாசரும் அம்பாலிகாவும் பெற்ற மகன் யார்?", "Pandu", "பாண்டு", [["Dhritarashtra", "திருதராஷ்டிரர்"], ["Vidura", "விதுரன்"], ["Duryodhana", "துரியோதனன்"]]),
  
  q(66, "Who was the son of sage Vyasa and a maidservant?", "வியாசரும் பணிவிட்ட பெண்ணும் பெற்ற மகன் யார்?", "Vidura", "விதுரன்", [["Dhritarashtra", "திருதராஷ்டிரர்"], ["Pandu", "பாண்டு"], ["Sanjaya", "சanjaya"]]),
  
  q(67, "Whose incarnation was Vidura?", "விதுரன் யாருடைய அவtar?", "Dharmaraja", "தharmaraja", [["Indra", "இந்திரன்"], ["Yama", "யமன்"], ["Krishna", "கிருஷ்ணர்"]]),
  
  q(68, "Who was born blind?", "பிறவியிலேயே குருடாகப் பிறந்தவர் யார்?", "Dhritarashtra", "திருதராஷ்டிரர்", [["Vidura", "விதுரன்"], ["Pandu", "பாண்டு"], ["Bhishma", "பீஷ்மர்"]]),
  
  q(69, "Whom did Dhritarashtra marry?", "திருதராஷ்டிரர் யாரை மணந்தார்?", "Gandhari", "காந்தாரி", [["Kunti", "குந்தி"], ["Ambika", "அம்பிகா"], ["Draupadi", "திரௌபதி"]]),
  
  q(70, "Which sage blessed Gandhari with a hundred sons?", "காந்தாரிக்கு நூறு மகன்கள் பிறக்க வரம் அளித்த முனிவர் யார்?", "Sage Vyasa", "வியாச முனிவர்", [["Durvasa", "துர்வாசர்"], ["Narada", "நாரதர்"], ["Parashara", "பராசரர்"]]),
  
  q(71, "What was the name of the eldest son of Gandhari?", "காந்தாரியின் முதல் மகன் யார்?", "Duryodhana", "துரியோதனன்", [["Dushasana", "துஷasanan"], ["Vikarna", "விகarna"], ["Yudhishthira", "யுதிஷ்டிரர்"]]),
  
  q(72, "What was the name of the daughter of Gandhari?", "காந்தாரியின் மகள் யார்?", "Dushala", "துshala", [["Draupadi", "திரௌபதி"], ["Subhadra", "சுபத்ரா"], ["Amba", "அம்பா"]]),
  
  q(73, "Who cursed Pandu that he would die the moment he cohabited with his wife?", "பாண்டுவைச் சபித்தது யார்?", "Sage Kindama", "கிந்தாம முனிவர்", [["Durvasa", "துர்வாசர்"], ["Vyasa", "வியாசர்"], ["Shringi", "ஷ்ரிங்கி"]]),
  
  q(74, "Which sage gifted a mantra to Kunti for invoking deities?", "குந்திக்கு மந்திரம் அளித்த முனிவர் யார்?", "Sage Durvasa", "துர்வாச முனிவர்", [["Vyasa", "வியாசர்"], ["Parashara", "பராசரர்"], ["Dhaumya", "தௌமியர்"]]),
  
  q(75, "Which god did Kunti invoke first of all in order to be blessed with a son?", "குந்தி முதலில் அழைத்த தெய்வம் யார்?", "Surya Deva", "சூரிய தேவர்", [["Indra", "இந்திரன்"], ["Yama", "யமன்"], ["Vayu", "வாயு"]]),
  
  q(76, "Which son of Kunti was born for Dharmaraja?", "தharmarajaவின் அருளால் குந்தியின் மகன் யார்?", "Yudhishthira", "யுதிஷ்டிரர்", [["Bhima", "பீமன்"], ["Arjuna", "அர்ஜுனன்"], ["Karna", "கர்ணன்"]]),
  
  q(77, "Which of the Pandavas is the second son of Kunti?", "குந்தியின் இரண்டாவது பாண்டava மகன் யார்?", "Bhima", "பீமன்", [["Yudhishthira", "யுதிஷ்டிரர்"], ["Arjuna", "அர்ஜுனன்"], ["Nakula", "நகுலன்"]]),
  
  q(78, "Draupadi was the princess of which kingdom?", "திரௌபதியின் நாடு எது?", "Panchala", "பஞ்சாலம்", [["Kuru", "கuru"], ["Magadha", "மagadha"], ["Kashi", "காசி"]]),
  
  q(79, "Which son of Kunti was born by the divine powers of Indra?", "இந்திரனின் அருளால் குந்தியின் மகன் யார்?", "Arjuna", "அர்ஜுனன்", [["Bhima", "பீமன்"], ["Yudhishthira", "யுதிஷ்டிரர்"], ["Sahadeva", "சahadeva"]]),
  
  q(80, "By whose divine powers were Nakula and Sahadeva born as the sons of Madri, the second wife of Pandu?", "நகுலனும் சahadevaவும் யாருடைய சக்தியால் பிறந்தனர்?", "Ashwini Kumaras", "அஸ்வினி குமaraகள்", [["Indra", "இந்திரன்"], ["Vayu", "வாயு"], ["Yama", "யமன்"]]),
  
  q(81, "Whom did Pandu try to cohabit with when he met his end?", "பாண்டு இறுதியில் யாருடன் இணைய முயன்றார்?", "Madri", "மadri", [["Kunti", "குந்தி"], ["Gandhari", "காந்தாரி"], ["Draupadi", "திரௌபதி"]]),
  
  q(82, "Which wife of Pandu became a Sati (the practice of burning oneself with the dead body of one's husband)?", "எந்த மனைவி சati ஆனார்?", "Madri", "மadri", [["Kunti", "குந்தி"], ["Gandhari", "காந்தாரி"], ["Ambika", "அம்பிகா"]]),
  
  q(83, "Which son of Pandu did Duryodhana try to poison?", "துரியோதனன் எந்த மகனை விஷம் கொடுத்துக் கொல்ல முயன்றான்?", "Bhima", "பீமன்", [["Arjuna", "அர்ஜுனன்"], ["Yudhishthira", "யுதிஷ்டிரர்"], ["Nakula", "நகுலன்"]]),
  
  q(84, "Which of the following bit Bhima and thus neutralised the effect of the poison in his body?", "பீமனைக் கடித்து விஷத்தை நீக்கியது எது?", "Serpents", "பாம்புகள்", [["Scorpion", "விர/alan"], ["Spider", "சில/spider"], ["Rat", "எல/i"]]),
  
  q(85, "Who rushed to rescue the Nagas when Bhima started to kill them?", "பீமனிடமிருந்து நாகங்களைக் காப்பாற்ற வந்தவர் யார்?", "Vasuki", "வாசுகி", [["Takshaka", "தட்ஷகன்"], ["Shesha", "சesha"], ["Garuda", "கaruda"]]),
  
  q(86, "Who taught the Pandavas and the Kauravas the art of warfare?", "பாண்டவர்களுக்கும் கௌரavர்களுக்கும் போர் கலை கற்பித்தவர் யார்?", "Dronacharya", "த்ரோணாசாரியர்", [["Bhishma", "பீஷ்மர்"], ["Kripacharya", "கிருபாசாரியர்"], ["Parashurama", "பரசுராமர்"]]),
  
  q(87, "Who was born as the son of sage Bharadwaja?", "பரத்வாஜரின் மகன் யார்?", "Dronacharya", "த்ரோணாசாரியர்", [["Ashwatthama", "அஷ்வத்தாமன்"], ["Kripacharya", "கிருபாசாரியர்"], ["Parashurama", "பரசுராமர்"]]),
  
  q(88, "What was the name of Dronacharya's wife?", "த்ரோணாசாரியரின் மனைவி யார்?", "Kripi", "கrpi", [["Kunti", "குந்தி"], ["Gandhari", "காந்தாரி"], ["Subhadra", "சுபத்ரா"]]),
  
  q(89, "From whom did Dronacharya learn the art of warfare?", "த்ரோணாசாரியர் போர் கலையை யாரிடம் கற்றுக் கொண்டார்?", "Parasurama", "பரசுராமர்", [["Bhishma", "பீஷ்மர்"], ["Vishwamitra", "விஸ்வாமித்ரர்"], ["Vyasa", "வியாசர்"]]),
  
  q(90, "Whom did Dronacharya resolve to take revenge on?", "த்ரோணாசாரியர் யாரிடம் பழி வாங்க விரும்பினார்?", "Drupada", "துrupaada", [["Duryodhana", "துரியோதனன்"], ["Bhishma", "பீஷ்மர்"], ["Karna", "கர்ணன்"]]),
  
  q(91, "Whom did Dronacharya refuse to teach archery?", "த்ரோணாசாரியர் யாருக்கு வில்லாட்சி கற்பிக்க மறுத்தார்?", "Ekalavya", "ஏkalavya", [["Arjuna", "அர்ஜுனன்"], ["Karna", "கர்ணன்"], ["Ashwatthama", "அஷ்வத்தாமன்"]]),
  
  q(92, "Who shot seven arrows from his bow and sealed the mouth of a dog?", "நாயின் வாயை அம்புகளால் மூடியவர் யார்?", "Ekalavya", "ஏkalavya", [["Arjuna", "அர்ஜுனன்"], ["Karna", "கர்ணன்"], ["Bhima", "பீமன்"]]),
  
  q(93, "What did Ekalavya offer as gurudakshina to Dronacharya?", "ஏkalavyaவின் கuru dakshina என்ன?", "Thumb", "கட்டை விரல்", [["Right hand", "வலது கை"], ["Bow", "வில்"], ["Kingdom", "அரசாட்சி"]]),
  
  q(94, "Who challenged Arjuna while he was displaying his archery skills?", "திறமை காட்சியில் அர்ஜுனனை சவalchallenge செய்தவர் யார்?", "Karna", "கர்ணன்", [["Bhima", "பீமன்"], ["Duryodhana", "துரியோதனன்"], ["Ashwatthama", "அஷ்வத்தாமன்"]]),
  
  q(95, "Who befriended Karna and made him the king of Angadesha?", "கர்ணனை அங்க அரசனாக்கியவர் யார்?", "Duryodhana", "துரியோதனன்", [["Dhritarashtra", "திருதராஷ்டிரர்"], ["Bhishma", "பீஷ்மர்"], ["Shakuni", "சakuni"]]),
  
  q(96, "What did Dronacharya seek from the Pandavas and the Kauravas as gurudakshina?", "த்ரோணர் கuru dakshinaவாகக் கேட்டது என்ன?", "King Drupada", "துrupaada அரசன்", [["Half kingdom", "அரசாட்சியின் பாதி"], ["Golden chariot", "பொன் தேர்"], ["Divine bow", "தெய்வீக வில்"]]),
  
  q(97, "Who captured King Drupada and presented him before Dronacharya?", "துrupaadaவைத் த்ரோணருக்காகப் பிடித்தவர் யார்?", "Arjuna", "அர்ஜுனன்", [["Bhima", "பீமன்"], ["Yudhishthira", "யுதிஷ்டிரர்"], ["Karna", "கர்ணன்"]]),
  
  q(98, "By what means did the Pandavas escape unhurt from the palace of lac?", "பாண்டவர்கள் lac palaceஐ எவ்வாறு தப்பினர்?", "Tunnel", "சுரங்கம்", [["Flying chariot", "பறக்கும் தேர்"], ["River", "நதி"], ["Disguise", "வேsham"]]),
  
  q(99, "In the forest, which demon wanted to kill and devour the Pandavas?", "பாண்டavர்களைத் devour விரும்பிய அசுரன் யார்?", "Demon Hidimban", "அசுரன் ஹிடimban", [["Bakasura", "பakasura"], ["Kamsa", "கம்சன்"], ["Jarasandha", "ஜராசந்தன்"]]),
  
  q(100, "Who killed the demon Hidimban?", "ஹிடimbanஐக் கொன்றவர் யார்?", "Bhima", "பீமன்", [["Arjuna", "அர்ஜுனன்"], ["Krishna", "கிருஷ்ணர்"], ["Yudhishthira", "யுதிஷ்டிரர்"]]),
];

const finalQuestions = [
  q(101, "What was the name of the sister of the demon Hidimban?", "ஹிடிம்பாசுரனின் சகோதரியின் பெயர் என்ன?", "Hidimbi", "ஹிடிம்பி", [["Hidimban", "ஹிடிம்பன்"], ["Draupadi", "திரௌபதி"], ["Subhadra", "சுபத்ரா"]]),
  q(102, "Which of the Pandavas married the sister of the demon Hidimban?", "ஹிடிம்பாசுரனின் சகோதரியை மணந்த பாண்டவர் யார்?", "Bhima", "பீமன்", [["Arjuna", "அர்ஜுனன்"], ["Yudhishthira", "யுதிஷ்டிரர்"], ["Krishna", "கிருஷ்ணர்"]]),
  q(103, "What was the name of the brave son of Bhima and the demoness Hidimbi?", "பீமனுக்கும் ஹிடிம்பிக்கும் பிறந்த வீரமகனின் பெயர் என்ன?", "Ghatotkacha", "கடோத்கஜன்", [["Abhimanyu", "அபிமன்யு"], ["Babruvahana", "பப்ருவாஹனன்"], ["Iravan", "இராவன்"]]),
  q(104, "Who emerged out of the holy fire when Drupada was performing the yajna?", "துருபதன் யாகம் வளர்த்த போது, வேள்வி தீயிலிருந்து தோன்றியவர்கள் யார்?", "Dhrishtadyumna - Draupadi", "திருஷ்டத்யும்னன் - திரௌபதி", [["Arjuna - Subhadra", "அர்ஜுனன் - சுபத்ரா"], ["Bhima - Hidimbi", "பீமன் - ஹிடிம்பி"], ["Karna - Vrishasena", "கர்ணன் - விருஷசேனன்"]]),
  q(105, "What possession of Vashishtha did Vishwamitra yearn to obtain?", "வசிஷ்டரின் எந்த உடைமையைப் பெற விஸ்வாமித்திரர் ஆசைப்பட்டார்?", "Khamadenu cow", "காமதேனு பசு", [["Divine bow", "தெய்வீக வில்"], ["Golden chariot", "பொன் தேர்"], ["Sacred fire", "புனித அக்னி"]]),
  q(106, "What was the name of the royal priest of the Pandavas?", "பாண்டவர்களின் அரச குருவின் பெயர் என்ன?", "Sage Dhaumya", "தௌமிய முனிவர்", [["Vyasa", "வியாசர்"], ["Durvasa", "துர்வாசர்"], ["Narada", "நாரதர்"]]),
  q(107, "Which of the Pandavas emerged victorious in the swayamvara of Draupadi?", "திரௌபதியின் சுயம்வரத்தில் வெற்றி பெற்ற பாண்டவர் யார்?", "Arjuna", "அர்ஜுனன்", [["Karna", "கர்ணன்"], ["Bhima", "பீமன்"], ["Duryodhana", "துரியோதனன்"]]),
  q(108, "Which place did the Pandavas choose as their capital when Dhritarashtra gave them half the kingdom?", "திருதிராஷ்டிரர் பாதி இராஜ்யத்தை பாண்டவர்களிடம் கொடுத்த போது அவர்கள் தங்களின் தலைநகரமாக எந்த இடத்தைத் தேர்ந்தெடுத்தனர்?", "Indraprastha", "இந்திரபிரஸ்தம்", [["Hastinapura", "ஹஸ்தினாபுரம்"], ["Dwarka", "துவாரகை"], ["Panchala", "பாஞ்சாலம்"]]),
  q(109, "What is the present name of Indraprastha?", "இந்திரப்பிரஸ்தத்தின் தற்போதைய பெயர் என்ன?", "Delhi", "டெல்லி", [["Mumbai", "மும்பை"], ["Kolkata", "கொல்கத்தா"], ["Chennai", "சென்னை"]]),
  q(110, "Who was forced to rush into the room wherein Yudhishthira and Draupadi were talking to each other in private?", "யுதிஷ்டிரரும் திரௌபதியும் தனிமையில் பேசிக்கொண்டிருந்த போது அவசியத்தின் நிமித்தமாக அவ்வறையினுள் நுழைந்தவர் யார்?", "Arjuna", "அர்ஜுனன்", [["Bhima", "பீமன்"], ["Nakula", "நகுலன்"], ["Krishna", "கிருஷ்ணர்"]]),
  q(111, "How many years did Arjuna spend in exile for disturbing Yudhishthira and Draupadi when they were talking to each other in private?", "யுதிஷ்டிரரும் திரௌபதியும் தனிமையில் பேசிக்கொண்டிருந்த போது இடையூறு செய்ததற்காக அர்ஜுனன் எத்தனை ஆண்டுகள் வனவாசம் மேற்கொண்டார்?", "12", "12", [["1", "1"], ["5", "5"], ["13", "13"]]),
  q(112, "Which sister of Lord Krishna did Arjuna marry?", "கிருஷ்ண பகவானின் எந்தச் சகோதரியை அர்ஜுனன் மணந்தார்?", "Subhadra", "சுபத்திரை", [["Draupadi", "திரௌபதி"], ["Uttara", "உத்தரா"], ["Chitrangada", "சித்ராங்கதை"]]),
  q(113, "What was the name of the brave son born to Arjuna and Subhadra?", "அர்ஜுனனுக்கும் சுபத்திரைக்கும் பிறந்த வீரமகனின் பெயர் என்ன?", "Abhimanyu", "அபிமன்யு", [["Parikshit", "பரீக்ஷித்"], ["Iravan", "இராவன்"], ["Babruvahana", "பப்ருவாஹனன்"]]),
  q(114, "How many days was the Mahabharata war fought?", "மகாபாரதப் போர் எத்தனை நாட்கள் நடைபெற்றது?", "18", "18", [["12", "12"], ["21", "21"], ["16", "16"]]),
  q(115, "Which of these inhabitants of Khandava Forest was once protected by Indra?", "காண்டவ வனவாசிகளில் யாரை இந்திரன் ஒருகாலத்தில் பாதுகாத்திருந்தார்?", "Takshaka serpent", "தக்ஷக நாகம்", [["Vasuki", "வாசுகி"], ["Shesha", "ஆதிசேஷன்"], ["Garuda", "கருடன்"]]),
  q(116, "Who gifted the Sudarshana Chakra to Lord Krishna?", "சுதர்ஷன சக்கரத்தைக் கிருஷ்ண பகவானுக்கு வழங்கியது யார்?", "Agni Deva", "அக்னி தேவர்", [["Indra", "இந்திரன்"], ["Shiva", "சிவன்"], ["Varuna", "வருணன்"]]),
  q(117, "Which bow did Varuna Deva gift Arjuna?", "வருணன் (நீர் தேவர்) அர்ஜுனனுக்கு எந்த வில்லைப் பரிசாக வழங்கினார்?", "Gandiva", "காண்டீபம்", [["Pinaka", "பினாகம்"], ["Sharanga", "சாரங்கம்"], ["Vijaya", "விஜயம்"]]),
  q(118, "Which warrior killed Jarasandha?", "ஜராசந்தனைக் கொன்ற மாவீரன் யார்?", "Bhima", "பீமன்", [["Arjuna", "அர்ஜுனன்"], ["Krishna", "கிருஷ்ணர்"], ["Yudhishthira", "யுதிஷ்டிரர்"]]),
  q(119, "Which son of Jarasandha did Lord Krishna make the king of Magadha?", "கிருஷ்ண பகவான் ஜராசந்தனின் எந்த மகனை மகத நாட்டின் அரசனாக நியமித்தார்?", "Sahadeva", "சகாதேவன்", [["Bhima", "பீமன்"], ["Arjuna", "அர்ஜுனன்"], ["Nakula", "நகுலன்"]]),
  q(120, "Which sage was the presiding priest of Yudhishthira’s Rajasuya yajna?", "யுதிஷ்டிரரின் ராஜசூய யாகத்திற்குத் தலைமைப் புரோகிதராக இருந்த முனிவர் யார்?", "Vyasa Muni", "வியாச முனி", [["Dhaumya", "தௌமியர்"], ["Durvasa", "துர்வாசர்"], ["Narada", "நாரதர்"]]),
  q(121, "Whom did all sages and kings present in the yajna wish to worship first?", "யாகத்தில் இருந்த அனைத்து முனிவர்களும் மற்றும் அரசர்களும் முதலில் யாரை வழிபட விரும்பினர்?", "Lord Krishna", "கிருஷ்ண பகவான்", [["Yudhishthira", "யுதிஷ்டிரர்"], ["Bhishma", "பீஷ்மர்"], ["Vyasa", "வியாசர்"]]),
  q(122, "Who started abusing Lord Krishna when he was chosen to be worshipped first?", "முதலில் வழிபட கிருஷ்ண பகவானைத் தேர்ந்தெடுத்த போது, அவரை அவமதித்து பேசத் தொடங்கியது யார்?", "Shishupala", "சிசுபாலன்", [["Duryodhana", "துரியோதனன்"], ["Shakuni", "சகுனி"], ["Karna", "கர்ணன்"]]),
  q(123, "How many eyes and hands did Shishupala have at the time of his birth?", "சிசுபாலன் பிறந்தபோது அவனுக்கு எத்தனை கண்களும் கைகளும் இருந்தன?", "3 eyes–4 hands", "3 கண்கள் - 4 கைகள்", [["2 eyes–2 hands", "2 கண்கள் - 2 கைகள்"], ["4 eyes–4 hands", "4 கண்கள் - 4 கைகள்"], ["1 eye–2 hands", "1 கண் - 2 கைகள்"]]),
  q(124, "Which parva contains the Bhagavad Gita?", "பகவத் கீதை எந்த பர்வத்தில் உள்ளது?", "Bhishma Parva", "பீஷ்ம பர்வம்", [["Drona Parva", "த்ரோண பர்வம்"], ["Karna Parva", "கர்ண பர்வம்"], ["Shalya Parva", "சல்ய பர்வம்"]]),
  q(125, "In whose lap did child Shishupala’s extra eye and two hands disappear?", "குழந்தை சிசுபாலனின் ஒரு கண் மற்றும் இரண்டு கைகள் யாரின் மடியில் மறைந்தன?", "Lord Krishna", "பகவான் கிருஷ்ணர்", [["Balarama", "பலராமர்"], ["Yudhishthira", "யுதிஷ்டிரர்"], ["Satyabhama", "சத்யபாமா"]]),
  q(126, "Who spoke the Vishnu Sahasranama to Yudhishthira Maharaja?", "விஷ்ணு ஸஹஸ்ரநாமத்தை யுதிஷ்டிர மகாராஜருக்கு உபதேசித்தவர் யார்?", "Bhishma", "பீஷ்மர்", [["Vyasa", "வியாசர்"], ["Krishna", "கிருஷ்ணர்"], ["Narada", "நாரதர்"]]),
  q(127, "How many times had Lord Krishna forgiven Shishupala before he ultimately killed him?", "சிசுபாலனைக் கொல்வதற்கு முன் பகவான் கிருஷ்ணர் அவனை எத்தனை முறை மன்னித்திருந்தார்?", "100", "100", [["50", "50"], ["21", "21"], ["10", "10"]]),
  q(128, "After the Rajasuya yajna, what title did Yudhishthira gain?", "ராஜசூய யாகத்திற்குப் பின்னர் யுதிஷ்டிரருக்கு என்ன பட்டம் வழங்கப்பட்டது?", "Emperor", "சக்கரவர்த்தி", [["King", "அரசன்"], ["Prince", "இளவரசன்"], ["Minister", "அமைச்சர்"]]),
  q(129, "At whom did Bhima, Arjuna and Draupadi, among others, laugh when he was tricked by an illusion?", "மாயையின் மூலம் ஏமாற்றப்பட்டபோது, பீமன், அர்ஜுனன் மற்றும் திரௌபதி உள்ளிட்டோர் யாரைப் பார்த்து சிரித்தனர்?", "Duryodhana", "துரியோதனன்", [["Dhritarashtra", "திருதராஷ்டிரர்"], ["Shakuni", "சகுனி"], ["Karna", "கர்ணன்"]]),
  q(130, "Who advised Duryodhana to engage Yudhishthira in a game of dice?", "யுதிஷ்டிரரைச் சூதாட்ட விளையாட்டில் ஈடுபடுத்தும்படி துரியோதனனுக்கு ஆலோசனை வழங்கியவர் யார்?", "Shakuni", "சகுனி", [["Duryodhana", "துரியோதனன்"], ["Dhritarashtra", "திருதராஷ்டிரர்"], ["Karna", "கர்ணன்"]]),
  q(131, "Whom did Dhritarashtra send to invite the Pandavas to a game of dice?", "பாண்டவர்களைச் சூதாட்ட விளையாட்டிற்கு அழைக்க திருதராஷ்டிரர் யாரை அனுப்பினார்?", "Vidura", "விதுரர்", [["Sanjaya", "சஞ்சயன்"], ["Bhishma", "பீஷ்மர்"], ["Drona", "த்ரோணர்"]]),
  q(132, "Which of his brothers did Yudhishthira put at stake when he lost all his wealth and possessions?", "தனது அனைத்து செல்வங்களையும் உடைமைகளையும் இழந்தபோது, யுதிஷ்டிரர் தனது எந்தச் சகோதரரைப் பணயமாக வைத்தார்?", "Nakula", "நகுலன்", [["Bhima", "பீமன்"], ["Arjuna", "அர்ஜுனன்"], ["Sahadeva", "சகாதேவன்"]]),
  q(133, "Whom did Yudhishthira put at stake when he had lost even himself in the game of dice?", "சூதாட்டத்தில் தன்னையே கூட இழந்த பிறகு, யுதிஷ்டிரர் யாரைப் பணயமாக வைத்தார்?", "Draupadi", "திரௌபதி", [["Kunti", "குந்தி"], ["Subhadra", "சுபத்திரை"], ["Gandhari", "காந்தாரி"]]),
  q(134, "Having won Draupadi in the game of dice, who ordered that she should be brought to the royal court?", "சூதாட்டத்தில் கௌரவர்கள் திரௌபதியை வென்ற பிறகு, அவளை அரசவைக்கு அழைத்து வருமாறு யார் உத்தரவிட்டார்?", "Duryodhana", "துரியோதனன்", [["Dushasana", "துச்சாதனன்"], ["Shakuni", "சகுனி"], ["Karna", "கர்ணன்"]]),
  q(135, "Who dragged Draupadi to the royal court by her hair?", "திரௌபதியை தலைமுடியைப் பிடித்து இழுத்தபடி அரசவைக்கு கொண்டு வந்தது யார்?", "Dushasana", "துச்சாதனன்", [["Duryodhana", "துரியோதனன்"], ["Karna", "கர்ணன்"], ["Shakuni", "சகுனி"]]),
  q(136, "Which son of Dhritarashtra protested against shaming Draupadi?", "திரௌபதி அவமானப்படுத்தப்படுவதற்கு எதிர்ப்பு தெரிவித்த திருதராஷ்டிரரின் மகன் யார்?", "Vikarna", "விகர்ணன்", [["Dushasana", "துச்சாதனன்"], ["Duryodhana", "துரியோதனன்"], ["Vishalaksha", "விசாலாக்ஷன்"]]),
  q(137, "What was the name of the evil man who tried to strip Draupadi of her clothes?", "திரௌபதியின் ஆடைகளைக் களைய முயன்ற கொடியவனின் பெயர் என்ன?", "Dushasana", "துச்சாதனன்", [["Duryodhana", "துரியோதனன்"], ["Karna", "கர்ணன்"], ["Shakuni", "சகுனி"]]),
  q(138, "Who came to Draupadi’s rescue when she called out for help?", "உதவிக்காக திரௌபதி அபயக்குரலிட்டபோது, அவளைக் காப்பாற்ற யார் வந்தார்?", "Lord Krishna", "பகவான் கிருஷ்ணர்", [["Bhima", "பீமன்"], ["Arjuna", "அர்ஜுனன்"], ["Vidura", "விதுரர்"]]),
  q(139, "Who took a pledge to shatter the thigh of Duryodhana?", "துரியோதனனின் தொடையை உடைப்பதாக சபதம் எடுத்தவர் யார்?", "Bhima", "பீமன்", [["Arjuna", "அர்ஜுனன்"], ["Krishna", "கிருஷ்ணர்"], ["Sahadeva", "சகாதேவன்"]]),
  q(140, "For how many years were the Pandavas sent into exile when they lost the game of dice?", "சூதாட்டத்தில் தோல்வியடைந்த பிறகு பாண்டவர்கள் எத்தனை ஆண்டுகள் வனவாசத்திற்கு அனுப்பப்பட்டனர்?", "13", "13", [["12", "12"], ["14", "14"], ["10", "10"]]),
  q(141, "Which year of their exile did the Pandavas spend in disguise (incognito)?", "பாண்டவர்கள் தங்களது வனவாசத்தின் எந்த ஆண்டை அஞ்ஞாதவாசமாக (அடையாளம் தெரியாமல்) கழித்தனர்?", "13th", "13வது", [["12th", "12வது"], ["1st", "1வது"], ["10th", "10வது"]]),
  q(142, "Whom did the Pandavas not take with them when they left for the forest?", "பாண்டவர்கள் வனத்திற்குச் செல்லும்போது, யாரைத் தங்களுடன் அழைத்துச் செல்லவில்லை?", "Kunti", "குந்தி", [["Draupadi", "திரௌபதி"], ["Subhadra", "சுபத்திரை"], ["Madri", "மாத்ரி"]]),
  q(143, "Where did Kunti live after the Pandavas had left for exile?", "பாண்டவர்கள் வனவாசத்திற்குச் சென்ற பிறகு, குந்தி எங்கு வாழத் தொடங்கினார்?", "At Vidura's house", "விதுரரின் வீட்டில்", [["At Bhishma's house", "பீஷ்மரின் வீட்டில்"], ["At Drona's house", "த்ரோணரின் வீட்டில்"], ["In forest", "காட்டில்"]]),
  q(144, "Which of these sages asked Yudhishthira to perform the worship of the Surya Deva?", "இந்த முனிவர்களில் யார் யுதிஷ்டிரரிடம் சூரிய பகவானை வழிபடுமாறு கூறினார்?", "Sage Dhaumya", "தௌமிய முனி", [["Vyasa", "வியாசர்"], ["Narada", "நாரதர்"], ["Durvasa", "துர்வாசர்"]]),
  q(145, "Being pleased with the devotion of Yudhishthira, what did the Sun god gift him?", "யுதிஷ்டிரரின் பக்தியால் மகிழ்ந்த சூரிய பகவான், அவருக்கு என்ன பரிசு வழங்கினார்?", "Akshayapatra", "அக்ஷயபாத்திரம்", [["Divine bow", "தெய்வீக வில்"], ["Golden chariot", "பொன் தேர்"], ["Crown", "கிரீடம்"]]),
  q(146, "In which forest did the Pandavas start living during their exile?", "வனவாசத்தின் போது பாண்டவர்கள் முதலில் எந்தக் காட்டில் வாழத் தொடங்கினர்?", "Kamyaka Forest", "காம்யக வனம்", [["Dwaitavana", "த்வைதவனம்"], ["Varnavata", "வாரணாவதம்"], ["Khandava", "காண்டவம்"]]),
  q(147, "Who angrily ordered Vidura to leave Hastinapura?", "கோபத்தில் விதுரரை ஹஸ்தினாபுரத்திலிருந்து வெளியேறுமாறு உத்தரவிட்டவர் யார்?", "Dhritarashtra", "திருதராஷ்டிரர்", [["Duryodhana", "துரியோதனன்"], ["Bhishma", "பீஷ்மர்"], ["Shakuni", "சகுனி"]]),
  q(148, "With whom did Vidura start living in the forest?", "விதுரர் காட்டில் யாருடன் வாழத் தொடங்கினார்?", "Pandavas", "பாண்டவர்களுடன்", [["Kauravas", "கௌரவர்கள்"], ["Krishna", "கிருஷ்ணர்"], ["Kunti", "குந்தி"]]),
  q(149, "Having been ordered out by Dhritarashtra, who respectfully brought Vidura back to Hastinapura?", "திருதராஷ்டிரரால் வெளியேறுமாறு உத்தரவிடப்பட்ட பிறகு, விதுரரை மரியாதையுடன் ஹஸ்தினாபுரத்திற்கு மீண்டும் அழைத்து வந்தவர் யார்?", "Sanjaya", "சஞ்சயன்", [["Bhishma", "பீஷ்மர்"], ["Vyasa", "வியாசர்"], ["Krishna", "கிருஷ்ணர்"]]),
  q(150, "Who took Abhimanyu and Subhadra along with Him to Dwaraka?", "அபிமன்யுவையும் சுபத்திரையையும் தம்முடன் துவாரகைக்கு அழைத்துச் சென்றவர் யார்?", "Lord Krishna", "பகவான் கிருஷ்ணர்", [["Balarama", "பலராமர்"], ["Arjuna", "அர்ஜுனன்"], ["Vasudeva", "வசுதேவர்"]]),
  q(151, "Which Pandava, following Sage Vyasa's advice, undertook intense penance in the Himalayas to obtain Lord Shiva's blessings?", "வியாச முனிவரின் ஆலோசனையின்படி, இமயமலையில் கடுமையான தவம் செய்து சிவபெருமானின் அருளைப் பெற முயன்ற பாண்டவர் யார்?", "Arjuna", "அர்ஜுனன்", [["Bhima", "பீமன்"], ["Yudhishthira", "யுதிஷ்டிரர்"], ["Nakula", "நகுலன்"]]),
  q(152, "Which demon appeared in the form of a wild boar to kill Arjuna when he was worshipping?", "அர்ஜுனன் வழிபாட்டில் ஈடுபட்டிருந்தபோது, அவனைக் கொல்ல காட்டுப்பன்றியின் வடிவில் தோன்றிய அசுரன் யார்?", "Muka", "முகாசுரன்", [["Hidimban", "ஹிடிம்பன்"], ["Bakasura", "பகாசுரன்"], ["Kamsa", "கம்சன்"]]),
  q(153, "In which form did Lord Shiva appear before Arjuna to test his devotion and valour?", "அர்ஜுனனின் பக்தியையும் வீரத்தையும் பரிசோதிக்க, அர்ஜுனனின் முன் சிவபெருமான் எந்த வடிவில் தோன்றினார்?", "Tribal hunter", "வேடன்", [["Sage", "முனிவர்"], ["King", "அரசன்"], ["Brahmin", "பிராமணர்"]]),
  q(154, "Which divine weapon did Lord Shiva give to Arjuna?", "அர்ஜுனனுக்கு சிவபெருமான் வழங்கிய தெய்வீக ஆயுதம் என்ன?", "Pashupatastra", "பசுபதாஸ்திரம்", [["Brahmastra", "பிரம்மாஸ்திரம்"], ["Narayanastra", "நாராயணாஸ்திரம்"], ["Agneyastra", "அக்னேயாஸ்திரம்"]]),
  q(155, "Whose divine chariot did Arjuna mount to go to heaven?", "தேவலோகம் செல்ல அர்ஜுனன் யாருடைய தெய்வீக ரதத்தில் ஏறினான்?", "Indra Deva", "இந்திர தேவர்", [["Krishna", "கிருஷ்ணர்"], ["Shiva", "சிவன்"], ["Yama", "யமன்"]]),
  q(156, "Which scripture was directly spoken by Lord Krishna to Arjuna?", "கிருஷ்ண பகவானால் அர்ஜுனனுக்கு நேரடியாக உபதேசிக்கப்பட்ட நூல் எது?", "Bhagavad Gita", "பகவத் கீதை", [["Ramayana", "இராமாயணம்"], ["Vedas", "வேதங்கள்"], ["Upanishads", "உபநிஷதங்கள்"]]),
  q(157, "Acting on the advice of Indra, Arjuna learnt how to dance and sing from a gandharva. What was the name of the gandharva?", "இந்திரனின் ஆலோசனையின்படி, அர்ஜுனன் நடனமும் பாடலும் கற்றுக்கொள்ள ஒரு கந்தர்வரிடம் பயின்றான். அந்த கந்தர்வரின் பெயர் என்ன?", "Chitrasena", "சித்ரசேனன்", [["Tumburu", "தும்புரு"], ["Narada", "நாரதர்"], ["Urvashi", "ஊர்வசி"]]),
  q(158, "Which nymph fell in love with Arjuna?", "அர்ஜுனனைக் காதலிக்கத் தொடங்கிய தேவகன்னிகை யார்?", "Urvashi", "ஊர்வசி", [["Draupadi", "திரௌபதி"], ["Subhadra", "சுபத்திரை"], ["Satyabhama", "சத்யபாமா"]]),
  q(159, "Who became angry with Arjuna and cursed him to become a eunuch?", "அர்ஜுனன் மீது கோபமடைந்து, அவன் திருநங்கையாக மாற வேண்டும் என்று சாபமிட்டவர் யார்?", "Urvashi", "ஊர்வசி", [["Gandhari", "காந்தாரி"], ["Draupadi", "திரௌபதி"], ["Amba", "அம்பா"]]),
  q(160, "For how many years did Indra limit the time duration of the curse placed on Arjuna by Urvashi?", "ஊர்வசி அர்ஜுனனுக்கு அளித்த சாபத்தின் காலத்தை இந்திரன் எத்தனை ஆண்டுகளாக வரையறுத்தான்?", "1", "1", [["12", "12"], ["5", "5"], ["13", "13"]]),
  q(161, "Who fought Parashurama for twenty-three days and remained undefeated, shattering his pride of being invincible?", "பரசுராமருடன் போரிட்டும் தோல்வியடையாமல், அவரது வெல்லமுடியாதவர் என்ற கர்வத்தை உடைத்தவர் யார்?", "Bhishma", "பீஷ்மர்", [["Arjuna", "அர்ஜுனன்"], ["Drona", "த்ரோணர்"], ["Karna", "கர்ணன்"]]),
  q(162, "In which river did Parasurama take a dip to wash away his sin of killing his own mother?", "தன் தாயைக் கொன்ற பாவத்தைப் போக்குவதற்கு பரசுராமர் எந்த நதியில் குளித்தார்?", "Lohit", "லோஹித் நதி", [["Ganga", "கங்கை"], ["Yamuna", "யமுனை"], ["Saraswati", "சரஸ்வதி"]]),
  q(163, "Which wife of King Sagara gave birth to 60,000 sons?", "சாகர மன்னனின் எந்த மனைவி 60,000 மகன்களை ஈன்றெடுத்தார்?", "Sumathi", "சுமதி", [["Kesini", "கேசினி"], ["Vinata", "விநதை"], ["Madri", "மாத்ரி"]]),
  q(164, "While on the bed of arrows, at whose request did Arjuna bring Ganga water?", "அம்புப் படுக்கையில் இருந்தபோது, யாருடைய வேண்டுகோளின் பேரில் அர்ஜுனன் கங்கை நீர் கொண்டு வந்தான்?", "Bhishma", "பீஷ்மர்", [["Yudhishthira", "யுதிஷ்டிரர்"], ["Dhritarashtra", "திருதராஷ்டிரர்"], ["Vyasa", "வியாசர்"]]),
  q(165, "Who stole the horse of the yajna performed by King Sagara?", "சாகர மன்னன் நடத்திய யாகத்தின் குதிரையைத் திருடியது யார்?", "Indra Deva", "இந்திர தேவர்", [["Varuna", "வருணன்"], ["Agni", "அக்னி"], ["Vayu", "வாயு"]]),
  q(166, "Who reduced the sixty thousand sons of Sagara to ashes in anger?", "கோபத்தில் சாகர மன்னனின் அறுபதாயிரம் மகன்களை எரித்து சாம்பலாக்கியது யார்?", "Sage Kapila", "கபில முனிவர்", [["Vyasa", "வியாசர்"], ["Durvasa", "துர்வாசர்"], ["Narada", "நாரதர்"]]),
  q(167, "Having heard the news of the death of his sons, whom did Sagara send to sage Kapila?", "தன் மகன்களின் மரணச் செய்தியைக் கேட்ட சாகரர், யாரைக் கபில முனிவரிடம் அனுப்பினார்?", "Anshuman", "அன்ஷுமான்", [["Bhagiratha", "பகீரதன்"], ["Amshuman", "அம்ஷுமான்"], ["Asamanjas", "அசமஞ்சன்"]]),
  q(168, "Which river, according to sage Kapila, was to be brought down to Earth from heaven in order to revive the dead sons of Sagara?", "சாகரரின் இறந்த மகன்களை உயிர்ப்பிக்க, கபில முனிவரின் கூற்றுப்படி எந்த நதி சொர்க்கத்திலிருந்து பூமிக்கு கொண்டு வரப்பட்டது?", "River Ganga", "கங்கை நதி", [["Yamuna", "யமுனை"], ["Saraswati", "சரஸ்வதி"], ["Godavari", "கோதாவரி"]]),
  q(169, "At the request of Sage Bhagiratha, who reduced the impact of the flow of river Ganga?", "பகீரதரின் கோரிக்கைக்கிணங்க, கங்கை நதியின் ஓட்டத்தின் தாக்கத்தைக் குறைத்தது யார்?", "Lord Shiva", "சிவபெருமான்", [["Vishnu", "விஷ்ணு"], ["Brahma", "பிரம்மா"], ["Bhagiratha", "பகீரதன்"]]),
  q(170, "Whom did sage Jamadagni marry?", "ஜமதக்னி முனிவர் யாரை மணந்தார்?", "Renuka", "ரேணுகா", [["Satyavati", "சத்யவதி"], ["Ganga", "கங்கை"], ["Kunti", "குந்தி"]]),
  q(171, "Which incarnation of Lord Vishnu did Renuka give birth to?", "ரேணுகா விஷ்ணுவின் எந்த அவதாரத்தைப் பெற்றெடுத்தார்?", "Parasurama", "பரசுராமர்", [["Krishna", "கிருஷ்ணர்"], ["Rama", "ராமர்"], ["Narasimha", "நரசிம்மர்"]]),
  q(172, "Who beheaded his mother, Renuka, on the instruction of his father, Sage Jamadagni?", "தந்தை ஜமதக்னி முனிவரின் உத்தரவின்படி தன் தாய் ரேணுகாவின் கழுத்தை வெட்டியவர் யார்?", "Parasurama", "பரசுராமர்", [["Jamadagni", "ஜமதக்னி"], ["Kartavirya", "கார்த்தவீர்யன்"], ["Bhishma", "பீஷ்மர்"]]),
  q(173, "What was the name of the proud king with a thousand hands whom Parasurama killed?", "பரசுராமர் கொன்ற ஆயிரம் கைகள் கொண்ட பெருமை பிடித்த அரசரின் பெயர் என்ன?", "Kartavirya Arjuna / Sahasrabahu Arjuna", "கார்த்தவீர்ய அர்ஜுனன் / சஹஸ்ரபாகு அர்ஜுனன்", [["Jarasandha", "ஜராசந்தன்"], ["Duryodhana", "துரியோதனன்"], ["Kamsa", "கம்சன்"]]),
  q(174, "Angered by the murder of his father, how many times did Parasurama rid the earth of warriors?", "தன் தந்தையின் கொலையால் கோபமடைந்திருந்த பரசுராமர், பூமியை எத்தனை முறை சத்திரியர்களிடமிருந்து விடுவித்தார்?", "21", "21", [["18", "18"], ["12", "12"], ["100", "100"]]),
  q(175, "Who cooled down the anger of Parasurama and stopped him from killing more warriors?", "பரசுராமரின் கோபத்தைத் தணித்து மேலும் சத்திரியர்களைக் கொல்லாமல் தடுத்தது யார்?", "Lord Dattatreya", "பகவான் தத்தாத்ரேயர்", [["Krishna", "கிருஷ்ணர்"], ["Vyasa", "வியாசர்"], ["Narada", "நாரதர்"]]),
  q(176, "Who narrated the Mahabharata to King Janamejaya?", "மகாபாரதத்தை ஜனமேஜய மன்னருக்கு கூறியவர் யார்?", "Vaishampayana", "வைசம்பாயனர்", [["Vyasa", "வியாசர்"], ["Sauti", "சௌதி"], ["Narada", "நாரதர்"]]),
  q(177, "By what name did the child, whose body had eight curves, become famous?", "எட்டு வளைவுகளைக் கொண்ட உடலுடன் இருந்த அந்தக் குழந்தை எந்தப் பெயரால் புகழ்பெற்றது?", "Ashtavakra", "அஷ்டாவக்ரர்", [["Abhimanyu", "அபிமன்யு"], ["Parikshit", "பரீக்ஷித்"], ["Dhritarashtra", "திருதராஷ்டிரர்"]]),
  q(178, "With whom did Ashtavakra return to his hermitage after defeating the priest of King Janaka in a debate on the scriptures?", "சாஸ்திர விவாதத்தில் ஜனக மன்னரின் புரோகிதரைத் தோற்கடித்த பிறகு அஷ்டாவக்ரர் யாருடன் தமது ஆசிரமத்திற்குத் திரும்பினார்?", "Sage Kahoda", "கஹோத முனிவர்", [["Vyasa", "வியாசர்"], ["Uddalaka", "உத்தாலகர்"], ["Shvetaketu", "ஸ்வேதகேது"]]),
  q(179, "In which river did Ashtavakra take a dip and get his deformed body back to normal?", "அஷ்டாவக்ரர் எந்த நதியில் நீராடி, தனது வளைந்த உடலை இயல்பான நிலைக்குத் திரும்பப்பெற்றார்?", "Samanga", "சாமங்கா", [["Ganga", "கங்கை"], ["Yamuna", "யமுனை"], ["Saraswati", "சரஸ்வதி"]]),
  q(180, "Who took the Pandavas to various places of pilgrimage in the Himalayas by making them sit on his back?", "பாண்டவர்களை தன் முதுகில் அமர வைத்து, இமயமலையில் உள்ள பல்வேறு புனித தலங்களுக்கு அழைத்துச் சென்றவர் யார்?", "Ghatotkacha", "கடோத்கஜன்", [["Bhima", "பீமன்"], ["Hanuman", "ஹனுமான்"], ["Krishna", "கிருஷ்ணர்"]]),
  q(181, "To whom was the Bhagavad Gita spoken?", "பகவத் கீதை யாருக்கு உபதேசிக்கப்பட்டது?", "Arjuna", "அர்ஜுனன்", [["Yudhishthira", "யுதிஷ்டிரர்"], ["Bhima", "பீமன்"], ["Dhritarashtra", "திருதராஷ்டிரர்"]]),
  q(182, "How many chapters does the Bhagavad Gita have?", "பகவத் கீதையில் எத்தனை அத்தியாயங்கள் உள்ளன?", "18", "18", [["12", "12"], ["21", "21"], ["16", "16"]]),
  q(183, "What was Hanuman to Bhima?", "ஹனுமானுக்கும் பீமனுக்கும் உள்ள உறவு என்ன?", "Brother", "சகோதரர்", [["Father", "தந்தை"], ["Guru", "குரு"], ["Friend", "நண்பர்"]]),
  q(184, "What was the name of Sri Krishna's conchshell?", "ஸ்ரீ கிருஷ்ணரின் சங்கின் பெயர் என்ன?", "Panchajanya", "பாஞ்சஜன்யம்", [["Devadatta", "தேவதத்தம்"], ["Paundra", "பௌண்ட்ரம்"], ["Anantavijaya", "அனந்தவிஜயம்"]]),
  q(185, "Having bade farewell to Hanuman, which forest did Bhima reach while searching for the lotus flower?", "ஹனுமானிடம் விடைபெற்றுத் தாமரை மலரைத் தேடிச் சென்ற பீமன் எந்தக் காட்டை அடைந்தார்?", "Saugandhika", "சௌகந்திகா வனம்", [["Kamyaka", "காம்யக வனம்"], ["Dwaitavana", "த்வைதவனம்"], ["Khandava", "காண்டவம்"]]),
  q(186, "To whom does Saugandhika forest and the pond in it belong to?", "சௌகந்திகா வனமும் அதிலுள்ள குளமும் யாருக்குச் சொந்தமானது?", "Kubera", "குபேரன்", [["Indra", "இந்திரன்"], ["Varuna", "வருணன்"], ["Yama", "யமன்"]]),
  q(187, "Who captured Bhima when he was enjoying a stroll in Vishakhayupa forest?", "விஷாகயூபா வனத்தில் பீமன் சஞ்சரித்துக் கொண்டிருந்த போது யார் அவரைப் பிடித்துக் கொண்டது?", "Serpent", "சர்ப்பம்", [["Demon", "அசுரன்"], ["Gandharva", "கந்தர்வர்"], ["Rakshasa", "ராக்ஷசன்"]]),
  q(188, "Who answered the questions of the serpent and got Bhima freed from its grasp?", "சர்ப்பத்தின் கேள்விகளுக்கு பதிலளித்து பீமனை அதன் பிடியிலிருந்து விடுவித்தது யார்?", "Yudhishthira", "யுதிஷ்டிரர்", [["Arjuna", "அர்ஜுனன்"], ["Bhima", "பீமன்"], ["Krishna", "கிருஷ்ணர்"]]),
  q(189, "Who revealed the Universal form to Arjuna on the battlefield?", "போர்க்களத்தில் அர்ஜுனனுக்கு விஸ்வரூபத்தைக் காட்டியவர் யார்?", "Lord Krishna", "பகவான் கிருஷ்ணர்", [["Shiva", "சிவன்"], ["Indra", "இந்திரன்"], ["Vyasa", "வியாசர்"]]),
  q(190, "Who got Duryodhana freed from the Gandharvas at the request of the Kaurava soldiers?", "கௌரவர்களின் வேண்டுகோளுக்கு இணங்கி துரியோதனனை கந்தர்வர்களிடமிருந்து மீட்டது யார்?", "Pandavas", "பாண்டவர்கள்", [["Kauravas", "கௌரவர்கள்"], ["Krishna", "கிருஷ்ணர்"], ["Bhishma", "பீஷ்மர்"]]),
  q(191, "Which sage did Duryodhana send to the Pandavas to be their guest?", "எந்த முனிவரைத் துரியோதனன் பாண்டவர்களிடம் விருந்தினராக அனுப்பிவைத்தான்?", "Durvasa", "துர்வாசர்", [["Vyasa", "வியாசர்"], ["Narada", "நாரதர்"], ["Dhaumya", "தௌமியர்"]]),
  q(192, "With how many disciples did Sage Durvasa arrive at the cottage of the Pandavas?", "துர்வாச முனிவர் பாண்டவர்களின் குடிசைக்கு எத்தனை சீடர்களுடன் வந்தார்?", "10000", "10000", [["1000", "1000"], ["100", "100"], ["5000", "5000"]]),
  q(193, "Whom did Draupadi pray to when she had no food to offer Sage Durvasa?", "துர்வாச முனிவருக்கு உணவளிக்க எதுவும் இல்லாதபோது, திரௌபதி யாரை வேண்டிக்கொண்டார்?", "Lord Krishna", "பகவான் கிருஷ்ணர்", [["Shiva", "சிவன்"], ["Durga", "துர்க்கை"], ["Vyasa", "வியாசர்"]]),
  q(194, "Who ate a single grain of food that satiated Sage Durvasa and his disciples?", "துர்வாச முனிவரையும் அவரது சீடர்களையும் திருப்திப்படுத்திய ஒரே ஒரு தானியத்தை மட்டும் உண்டவர் யார்?", "Lord Krishna", "பகவான் கிருஷ்ணர்", [["Draupadi", "திரௌபதி"], ["Yudhishthira", "யுதிஷ்டிரர்"], ["Bhima", "பீமன்"]]),
  q(195, "Who got enchanted with the beauty of Draupadi and abducted her in the absence of the Pandavas?", "பாண்டவர்கள் இல்லாத நேரத்தில் திரௌபதியின் அழகில் மயங்கி, அவளைக் கடத்திச் சென்றவர் யார்?", "Jayadratha", "ஜயத்ரதன்", [["Karna", "கர்ணன்"], ["Duryodhana", "துரியோதனன்"], ["Shakuni", "சகுனி"]]),
  q(196, "What was Jayadratha to Duryodhana?", "ஜயத்ரதன் துரியோதனனுக்கு என்ன உறவுமுறை?", "Brother-in-law", "மைத்துனன்", [["Brother", "சகோதரர்"], ["Cousin", "உறவினர்"], ["Friend", "நண்பர்"]]),
  q(197, "As a punishment, who tonsured the head of Jayadratha leaving five tufts of hair on it?", "தண்டனையாக, ஜயத்ரதனின் தலையை மொட்டையடித்து அதில் ஐந்து முடிக்கொத்துகளை மட்டுமே விட்டது யார்?", "Bhima", "பீமன்", [["Arjuna", "அர்ஜுனன்"], ["Yudhishthira", "யுதிஷ்டிரர்"], ["Krishna", "கிருஷ்ணர்"]]),
  q(198, "Jayadratha was incapable of defeating a Pandava according to a boon granted to him by Lord Shiva. Name the Pandava.", "சிவபெருமானால் வழங்கப்பட்ட வரத்தின் படி, ஜயத்ரதனால் தோற்கடிக்க முடியாத பாண்டவர் யார்?", "Arjuna", "அர்ஜுனன்", [["Bhima", "பீமன்"], ["Nakula", "நகுலன்"], ["Sahadeva", "சகாதேவன்"]]),
  q(199, "Which princess had given birth to Karna before she was even married?", "திருமணம் ஆவதற்கு முன்பே கர்ணனைப் பெற்றெடுத்த இளவரசி யார்?", "Kunti", "குந்தி", [["Madri", "மாத்ரி"], ["Gandhari", "காந்தாரி"], ["Draupadi", "திரௌபதி"]]),
  q(200, "Who was the father of Karna?", "கர்ணனின் தந்தை யார்?", "Surya Deva", "சூரிய தேவர்", [["Indra", "இந்திரன்"], ["Vayu", "வாயு"], ["Yama", "யமன்"]]),
];

questions.push(...moreQuestions, ...finalQuestions);

function cleanQuestion(question) {
  question.questionTamil = cleanTamil(question.questionTamil);
  question.options.forEach((o) => {
    o.tamil = cleanTamil(o.tamil);
  });
  return question;
}

const allQuestions = questions.map(cleanQuestion);

if (allQuestions.length !== 200) {
  console.error(`Expected 200 questions, got ${allQuestions.length}`);
  process.exit(1);
}

const outPath = path.join(__dirname, "..", "data", "questions.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(allQuestions, null, 2) + "\n", "utf8");

console.log(`Wrote ${allQuestions.length} questions to ${outPath}`);
