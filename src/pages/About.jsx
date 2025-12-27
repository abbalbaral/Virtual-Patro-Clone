const About = () => {
  return (
    <div className="bg-slate-100 min-h-[80vh] py-10 px-4 font-mukta">
      {/* 
         Container: 
         - max-w-3xl: slightly narrower for better reading experience (like a book/article)
         - bg-white: Clean paper look
      */}
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200">
         
         {/* 1. Intro Section */}
         <div className="space-y-4 text-gray-800 leading-relaxed text-lg">
            <p>
              <span className="font-bold text-[#842362]">भर्चुअल पात्रो</span> नेपाल सरकार, संस्कृति, पर्यटन तथा नागरिक उड्डयन मन्त्रालय अन्तर्गत नेपाल पञ्चाङ्ग निर्णयक समितिबाट अनुमोदित अनलाइन / अफलाइन पात्रोहरूमध्ये एक हो। भर्चुअल पात्रो, भर्चुअल टेक्नोलोजी प्रा. लि. को एक उत्पादन हो।
            </p>
            <p>
              भर्चुअल पात्रो व्यक्तिगत र संस्थागत प्रयोजनका लागि वेब एप्लिकेसनको रूपमा सुरु गरिएको हो, जसमा निम्न सुविधाहरू छन् :
            </p>
         </div>

         {/* 2. Features List - Simple & Clean */}
         <div className="my-8 pl-2 md:pl-4 border-l-4 border-gray-100 space-y-3">
            {[
               { label: "मिति परिवर्तन", text: "मिति परिवर्तन सुविधा (ई.सं. र वि.सं. को सजिलो रूपान्तरण)" },
               { label: "मूर्हूत", text: "विवाह, व्रतबन्ध, रुद्री, पास्नी, शुभ मूर्हूत" },
               { label: "राशिफल", text: "दैनिक, मासिक, तथा वार्षिक राशिफल" },
               { label: "सपनाको फल", text: "सपना के देखियो भने कस्तो फल प्राप्त हुन्छ, संकेत र अर्थ" },
               { label: "विनिमय दर", text: "विदेशी मुद्रा र नेपाल मुद्राको विनिमय दर" },
               { label: "कर्मकाण्ड", text: "कर्मकाण्डको पुस्तक" }
            ].map((item, index) => (
               <div key={index} className="text-gray-700 text-lg">
                  <span className="font-bold text-gray-900 mr-2">{item.label}:</span>
                  <span>{item.text}</span>
               </div>
            ))}
            
            <p className="pt-2 text-gray-500 italic text-base">
               साथै भविष्यमा थप नयाँ सुविधाहरू पनि आउने छन्।
            </p>
         </div>

         {/* 3. Contact Section - Plain Text at Bottom */}
         <div className="mt-10 pt-8 border-t border-gray-100 text-lg text-gray-800">
            <p className="font-bold mb-1">सम्पर्क:</p>
            <p>भर्चुअल पात्रो (भर्चुअल टेक्नोलोजी प्रा.ली.)</p>
            <p>पोखरा-१५, नयागाँउ, कास्की</p>
            <a 
              href="mailto:contact@virtualpatro.com" 
              className="text-[#842362] hover:underline mt-1 inline-block"
            >
               contact@virtualpatro.com
            </a>
         </div>

      </div>
    </div>
  );
};

export default About;