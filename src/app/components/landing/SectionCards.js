import { Lightbulb, Paperclip, Search, Sparkles } from 'lucide-react';

const SectionCard = ({ title, description, children }) => (
  <div className="w-full p-6 rounded-lg shadow-md ">
    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">{title}</h2>
    <p className="text-base md:text-lg text-gray-400 mb-6">{description}</p>
    <div className="p-4 rounded-lg">{children}</div>
  </div>
);

const ButtonGroup = () => (
  <div className="flex flex-wrap gap-4 justify-between">
    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors w-full sm:w-auto">
      <Paperclip className="w-4 h-4 text-gray-400" />
      <span className="text-gray-300 text-sm">Attach</span>
    </button>

    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors w-full sm:w-auto">
      <Search className="w-4 h-4 text-gray-400" />
      <span className="text-gray-300 text-sm">Search</span>
    </button>

    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors w-full sm:w-auto">
      <Lightbulb className="w-4 h-4 text-gray-400" />
      <span className="text-gray-300 text-sm">Reason</span>
    </button>
  </div>
);

export default function SectionCards() {
  return (
    <div className="min-h-screen text-white p-6 sm:p-8 md:p-16 pt-13 relative">
      
      {/* Top Horizontal Line */}
       <div className="absolute top-10 left-8 right-8 h-[1px] bg-white/9"></div> 

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10">

          {/* Left Section */}
          <div className="space-y-8">
            <SectionCard
              title="Smart Project Insights"
              description="Leverage AI-driven insights to optimize project workflows, improve task allocation, and enhance team collaboration."
            >
              <div className="space-y-4 relative z-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-semibold text-white text-lg mb-0">Content</h3>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400">Suggestions</span>
                  <span className="flex items-center gap-1 text-gray-400">Automate task tracking and improve project visibility.</span>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <span className="text-gray-400 whitespace-nowrap">Duplicate of</span>
                  <span className="flex items-center gap-2 text-gray-300">
                    <span className="text-gray-400">Identify recurring issues and suggest solutions.</span>
                  </span>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <span className="text-gray-400 whitespace-nowrap">Related to</span>
                  <span className="flex items-center gap-2 text-gray-300">
                    <span className="text-gray-400">Track dependencies across multiple tasks and projects.</span>
                  </span>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/20 -translate-x-1/2"></div>

          {/* Right Section */}
          <div className="space-y-8">
            <SectionCard
              title="Project Automation Tools"
              description="Integrate and automate project tools for seamless task flow and real-time tracking."
            >
              <div className="relative pt-8">
                {/* Code Block */}
                <div className="relative z-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl">
                  <div className="font-mono text-sm text-gray-300 space-y-1">
                    <div className="text-gray-500">//ProjectManagementTool/Axion</div>
                    <div className="mt-3">
                      <div className="text-gray-400">"mcpServers": {'{'}</div>
                      <div className="ml-4 text-gray-300">"linear": {'{'}</div>
                      <div className="ml-8">
                        <span className="text-blue-400">"command"</span>
                        <span className="text-gray-500">: </span>
                        <span className="text-green-400">"pnpm"</span>
                      </div>
                      <div className="ml-4">{'}'}</div>
                      <div>{'}'}</div>
                    </div>
                  </div>
                </div>

                {/* Ask Anything Box */}
                <div className="relative z-20 -mt-16 ml-8">
                  <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <input
                      type="text"
                      placeholder="Ask about project deadlines or task priorities."
                      className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-lg mb-6"
                    />
                    <ButtonGroup />
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Line */}
       <div className="absolute bottom-41 left-8 right-8 h-[1px] bg-white/9"></div>
    </div>
  );
}
