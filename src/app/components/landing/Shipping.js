import React from 'react'
import ElectricBorder from '@/(Plasma)/ElectricBorder'

const Shipping = () => {

  return (
    <div>
        <div className="w-full flex justify-center mb-10 sm:-mt-100 -mt-50">
          <h2 className="text-white font-JBM text-4xl mb-5 font-bold tracking-wide z-20">
            Features
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center sm:max-w-5xl sm:gap-2 gap-15 mx-auto z-20">
          <ElectricBorder
            color="#7df9ff"
            speed={0.5}
            chaos={0.10}
            style={{ borderRadius: 16, padding: 0, maxWidth: 300, margin: "auto" }}
            className="z-20"
          >
            <div className="ed-demo-card w-[300px] h-auto rounded-[16px] font-FT p-6 z-20">
              <span className="eb-demo-badge z-20">
                Active
              </span>
              <div className='mt-2 text-[#E9F8FF] flex flex-col gap-3 z-20'>
                <h2 className="eb-demo-title z-20">
                    Sprint Velocity
                </h2>
                <p className="eb-demo-desc z-20">
                  Track your team&apos;s performance and burn down metrics for the current cycle.
                </p>
              </div>
              <div className="eb-demo-row z-20">
                <span className="eb-demo-chip z-20">
                  High Priority
                </span>
                <span className="eb-demo-chip z-20">
                  v1.0
                </span>
              </div>
            </div>
          </ElectricBorder>

          <ElectricBorder
            color="#7df9ff"
            speed={0.5}
            chaos={0.10}
            style={{ borderRadius: 16, padding: 0, maxWidth: 300, margin: "auto" }}
            className="z-20"
          >
            <div className="ed-demo-card w-[300px] h-auto rounded-[16px] font-FT p-6 z-20">
              <span className="eb-demo-badge z-20">
                Active
              </span>
              <div className='mt-2 text-[#E9F8FF] flex flex-col gap-3 z-20'>
                <h2 className="eb-demo-title z-20">
                  Rapid Boards
                </h2>
                <p className="eb-demo-desc z-20">
                  Move tasks across boards and customize workflows to match your team’s process.
                </p>
              </div>
              <div className="eb-demo-row z-20">
                <span className="eb-demo-chip z-20">
                  Collaboration
                </span>
                <span className="eb-demo-chip z-20">
                  v1.0
                </span>
              </div>
            </div>
          </ElectricBorder>

          <ElectricBorder
            color="#7df9ff"
            speed={0.5}
            chaos={0.10}
            style={{ borderRadius: 16, padding: 0, maxWidth: 300, margin: "auto" }}
            className="z-20"
          >
            <div className="ed-demo-card w-[300px] h-auto rounded-[16px] font-FT p-6 z-20">
              <span className="eb-demo-badge z-20">
                Active
              </span>
              <div className='mt-2 text-[#E9F8FF] flex flex-col gap-3 z-20'>
                <h2 className="eb-demo-title z-20">
                  Insightful Analytics
                </h2>
                <p className="eb-demo-desc z-20">
                  Gain actionable insights with easy-to-read analytics about your project’s health.
                </p>
              </div>
              <div className="eb-demo-row z-20">
                <span className="eb-demo-chip z-20">
                  Analytics
                </span>
                <span className="eb-demo-chip z-20">
                  v1.0
                </span>
              </div>
            </div>
          </ElectricBorder>
        </div>
    </div>
  )
}

export default Shipping