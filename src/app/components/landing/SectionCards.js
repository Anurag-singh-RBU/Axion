import { Lightbulb, Paperclip, Search, Sparkles } from 'lucide-react';

const SectionCard = ({ title, description, children }) => (
  <div className="w-full sm:p-6 px-3 rounded-lg shadow-md">
    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 font-JBM">{title}</h2>
    <p className="text-sm sm:text-md text-gray-400 mb-3 font-HG text-justify">{description}</p>
    <div className="py-4 rounded-lg sm:-ml-5 ml-0">{children}</div>
  </div>
);

const ButtonGroup = () => (
  <div className="flex flex-wrap gap-3">
    <button className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors w-full sm:w-auto">
      <Paperclip className="w-4 h-4 text-gray-400"/>
      <span className="text-gray-300 text-sm">Attach</span>
    </button>

    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors w-full sm:w-auto">
      <Search className="w-4 h-4 text-gray-400"/>
      <span className="text-gray-300 text-sm">Search</span>
    </button>

    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors w-full sm:w-auto">
      <Lightbulb className="w-4 h-4 text-gray-400"/>
      <span className="text-gray-300 text-sm">Reason</span>
    </button>
  </div>
);

export default function SectionCards() {
  return (
    <div className="h-auto text-white px-6 sm:p-8 md:p-16 pt-13 relative sm:mt-30 mt-10 sm:mb-0">
      
      {/* Top Horizontal Line */}
       <div className="absolute top-10 left-8 right-8 h-[1px] bg-white/9"></div> 

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 relative z-10">

          {/* Left Section */}
          <div className="space-y-8">
            <SectionCard
              title="Smart Project Insights"
              description="Leverage AI driven insights to optimize project workflows , improve task allocation and enhance team collaboration."
            >
              <div className="sm:space-y-2 space-y-4 relative z-10 tracking-wider bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5"/>
                  <h3 className="font-bold font-JBM text-white text-lg mb-0">Content</h3>
                </div>

                <div className="flex items-center sm:text-sm text-xs">
                  <span className="text-gray-400">Automate task tracking and improve project visibility.</span>
                </div>

                <div className="flex items-start gap-3 sm:text-sm text-xs">
                  <span className="text-gray-400">Identify recurring issues and suggest solutions.</span>
                </div>

                <div className="flex items-start gap-3 sm:text-sm text-xs">
                    <span className="text-gray-400">Track dependencies across multiple tasks and projects.</span>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="sm:space-y-4">
            <SectionCard
              title="Automation Tools"
              description="Integrate and automate project tools for seamless task flow and real time tracking.">
              <div className="relative">
                {/* Code Block */}
                <div className="relative z-10 bg-linear-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl">
                  <div className="font-mono text-sm text-gray-300 space-y-1">
                    <div className="text-gray-200 font-JBM tracking-wider">AXION</div>
                    <div className="mt-3 text-xs space-y-1">
                      <div className="text-gray-400 font-HG tracking-wider">mcpservers : {'{'}</div>
                      <div className="ml-4 text-gray-300 font-HG tracking-wider">linear : {'{'}</div>
                      <div className="ml-8 mb-3">
                        <span className="text-blue-400 font-HG tracking-wider">command</span>
                        <span className="text-gray-500"> : </span>
                        <span className="text-green-400 font-HG tracking-wider">pnpm</span>
                      </div>
                      <div className="ml-4">{'}'}&nbsp;</div>
                      <div>{'}'}&nbsp;</div>
                    </div>
                  </div>
                </div>

                {/* Ask Anything Box */}
                <div className="relative z-20 -mt-16 ml-15 sm:block hidden">
                  <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <input
                      type="text"
                      placeholder="Ask about project deadlines or task priorities."
                      className="w-full bg-transparent border-none outline-none font-HG tracking-wider text-white placeholder-gray-500 text-md mb-6"/>
                    <ButtonGroup/>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
