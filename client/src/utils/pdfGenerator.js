import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Function to generate and download PDF brochure using HTML-to-Canvas approach
export const generateCourseBrochure = async (program) => {
  // Create HTML content for the brochure
  const createBrochureHTML = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return `
      <div id="pdf-content" style="
        width: 794px; 
        background: white; 
        font-family: Arial, sans-serif;
        color: #374151;
        line-height: 1.4;
        margin: 0;
        padding: 0;
      ">
        <!-- PAGE 1: HERO & OVERVIEW -->
        <div style="
          width: 794px; 
          position: relative;
          background: white;
          margin: 0;
          padding: 0;
          min-height: 1000px;
          max-height: 1122px;
          overflow: hidden;
        ">
          <!-- Header -->
          <div style="
            background: linear-gradient(135deg, #051c32 0%, #0f2847 100%);
            height: 200px;
            position: relative;
            padding: 50px 45px;
            color: white;
            margin: 20px;
            border-radius: 12px;
            display: flex;
            align-items: center;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; height: 100%;">
              <div>
                <img src="/images/WhiteLogo_TransparentBg.png" alt="ACMYX Logo" style="height: 80px; width: auto; margin-bottom: 15px; display: block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div style="display: none;">
                  <h1 style="font-size: 36px; margin: 0; font-weight: bold; color: white; margin-bottom: 10px;">ACMYX</h1>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <i class="fas fa-globe" style="font-size: 16px; margin-right: 12px; color: #f59e0b;"></i>
                  <span style="font-size: 16px; font-weight: 500;">www.acmyx.com</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <i class="fas fa-envelope" style="font-size: 16px; margin-right: 12px; color: #f59e0b;"></i>
                  <span style="font-size: 16px; font-weight: 500;">acmyxteams@gmail.com</span>
                </div>
              </div>
              <div style="text-align: right;">
                <p style="font-size: 18px; margin: 0; font-weight: bold;">COURSE BROCHURE</p>
                <p style="font-size: 14px; margin: 8px 0 0 0; opacity: 0.8;">${currentDate}</p>
              </div>
            </div>
          </div>

          <!-- Secondary stripe -->
          <div style="
            background: #f59e0b; 
            height: 12px; 
            margin: 0 20px; 
            border-radius: 0 0 8px 8px;
            position: relative;
            z-index: 0;
          "></div>

          <!-- Content Container with margins -->
          <div style="
            margin: 20px; 
            padding: 20px;
            background: #ffffff;
            position: relative;
            z-index: 1;
            border-radius: 8px;
          ">
            <!-- Hero Image and Course Title Container -->
            <div style="display: flex; align-items: center; margin-bottom: 25px; gap: 20px;">
              <!-- Course Title -->
              <div style="flex: 1;">
                <h2 style="
                  font-size: 28px; 
                  color: #051c32; 
                  margin: 0; 
                  font-weight: bold;
                  line-height: 1.2;
                ">${program.title}</h2>
              </div>

              <!-- Hero Image -->
              ${program.heroImage ? `
                <div style="
                  width: 200px; 
                  height: 120px; 
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                  flex-shrink: 0;
                ">
                  <img src="${program.heroImage}" alt="Course Hero" style="
                    width: 100%; 
                    height: 100%; 
                    object-fit: cover;
                  " onerror="this.parentElement.style.display='none';">
                </div>
              ` : ''}
            </div>

            <!-- Course Details Tiles -->
            <div style="display: flex; gap: 15px; margin: 20px 0; clear: both; position: relative; z-index: 1;">
              <!-- Duration Tile -->
              <div style="
                flex: 1;
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
              ">
                <div style="
                  width: 40px;
                  height: 40px;
                  background: #f59e0b;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 0 auto 10px auto;
                  color: white;
                  font-weight: bold;
                ">
                  <i class="fas fa-clock" style="font-size: 18px;"></i>
                </div>
                <h4 style="font-size: 12px; color: #051c32; margin: 0 0 5px 0; font-weight: bold;">DURATION</h4>
                <p style="font-size: 14px; color: #4b5563; margin: 0;">${program.duration}</p>
              </div>

              <!-- Format Tile -->
              <div style="
                flex: 1;
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
              ">
                <div style="
                  width: 40px;
                  height: 40px;
                  background: #051c32;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 0 auto 10px auto;
                  color: white;
                  font-weight: bold;
                ">
                  <i class="fas fa-laptop" style="font-size: 18px;"></i>
                </div>
                <h4 style="font-size: 12px; color: #051c32; margin: 0 0 5px 0; font-weight: bold;">FORMAT</h4>
                <p style="font-size: 14px; color: #4b5563; margin: 0;">${program.format}</p>
              </div>

              <!-- Level Tile -->
              <div style="
                flex: 1;
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
              ">
                <div style="
                  width: 40px;
                  height: 40px;
                  background: #f59e0b;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 0 auto 10px auto;
                  color: white;
                  font-weight: bold;
                ">
                  <i class="fas fa-signal" style="font-size: 18px;"></i>
                </div>
                <h4 style="font-size: 12px; color: #051c32; margin: 0 0 5px 0; font-weight: bold;">LEVEL</h4>
                <p style="font-size: 14px; color: #4b5563; margin: 0;">${program.level}</p>
              </div>
            </div>

            <!-- Program Overview -->
            ${program.overview ? `
              <div style="margin: 20px 0; clear: both;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 6px; height: 30px; background: #f59e0b; margin-right: 15px; border-radius: 3px;"></div>
                  <h3 style="font-size: 20px; color: #051c32; margin: 0; font-weight: bold;">Program Overview</h3>
                </div>
                <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <p style="font-size: 12px; color: #4b5563; line-height: 1.6; margin: 0;">${program.overview}</p>
                </div>
              </div>
            ` : ''}

            <!-- Course Benefits -->
            <div style="margin: 20px 0;">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 6px; height: 30px; background: #051c32; margin-right: 15px;"></div>
                <h3 style="font-size: 20px; color: #051c32; margin: 0; font-weight: bold;">Why Choose This Course</h3>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="
                  background: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  padding: 15px;
                ">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="
                      width: 25px;
                      height: 25px;
                      background: #f59e0b;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin-right: 10px;
                      color: white;
                    ">
                      <i class="fas fa-users" style="font-size: 12px;"></i>
                    </div>
                    <h4 style="font-size: 12px; color: #051c32; margin: 0; font-weight: bold;">Expert Mentorship</h4>
                  </div>
                  <p style="font-size: 10px; color: #4b5563; margin: 0; line-height: 1.4;">Learn from industry professionals with hands-on guidance</p>
                </div>
                
                <div style="
                  background: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  padding: 15px;
                ">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="
                      width: 25px;
                      height: 25px;
                      background: #051c32;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin-right: 10px;
                      color: white;
                    ">
                      <i class="fas fa-project-diagram" style="font-size: 12px;"></i>
                    </div>
                    <h4 style="font-size: 12px; color: #051c32; margin: 0; font-weight: bold;">Real Projects</h4>
                  </div>
                  <p style="font-size: 10px; color: #4b5563; margin: 0; line-height: 1.4;">Build portfolio-worthy projects with real-world applications</p>
                </div>
                
                <div style="
                  background: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  padding: 15px;
                ">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="
                      width: 25px;
                      height: 25px;
                      background: #f59e0b;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin-right: 10px;
                      color: white;
                    ">
                      <i class="fas fa-certificate" style="font-size: 12px;"></i>
                    </div>
                    <h4 style="font-size: 12px; color: #051c32; margin: 0; font-weight: bold;">Industry Recognition</h4>
                  </div>
                  <p style="font-size: 10px; color: #4b5563; margin: 0; line-height: 1.4;">Get certified credentials recognized by top employers</p>
                </div>
                
                <div style="
                  background: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  padding: 15px;
                ">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="
                      width: 25px;
                      height: 25px;
                      background: #051c32;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin-right: 10px;
                      color: white;
                    ">
                      <i class="fas fa-headset" style="font-size: 12px;"></i>
                    </div>
                    <h4 style="font-size: 12px; color: #051c32; margin: 0; font-weight: bold;">24/7 Support</h4>
                  </div>
                  <p style="font-size: 10px; color: #4b5563; margin: 0; line-height: 1.4;">Get continuous support throughout your learning journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- PAGE 2: KEY HIGHLIGHTS & CURRICULUM -->
        <div style="
          width: 794px; 
          position: relative; 
          padding-top: 60px; 
          clear: both;
          background: white;
          margin: 15px;
          min-height: 1000px;
          max-height: 1122px;
          overflow: hidden;
        ">
          <!-- Small Logo at Top Right -->
          <div style="
            position: absolute;
            top: 10px;
            right: 30px;
            z-index: 10;
          ">
            <img src="/images/DarkLogo_TransparentBg.png" alt="ACMYX Logo" style="height: 25px; width: auto;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div style="display: none; font-size: 12px; font-weight: bold; color: #051c32;">ACMYX</div>
          </div>

          <!-- Header -->
          <div style="
            background: linear-gradient(135deg, #051c32 0%, #0f2847 100%);
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            color: white;
            margin: 20px;
            border-radius: 12px;
          ">
            <div>
              <h2 style="font-size: 24px; margin: 0; font-weight: bold; color: white;">Key Highlights & Curriculum</h2>
              <p style="font-size: 12px; margin: 5px 0 0 0; opacity: 0.9;">Weeks 1-2: Foundation</p>
            </div>
            <div style="
              width: 60px;
              height: 60px;
              background: rgba(245, 158, 11, 0.2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <i class="fas fa-graduation-cap" style="font-size: 24px; color: #f59e0b;"></i>
            </div>
          </div>

          <!-- Content Container with margins -->
          <div style="margin: 20px; padding: 20px;">
            <!-- Key Highlights -->
            ${program.keyHighlights && program.keyHighlights.length > 0 ? `
              <div style="margin: 0 0 20px 0; clear: both;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 6px; height: 30px; background: #f59e0b; margin-right: 15px; border-radius: 3px;"></div>
                  <h3 style="font-size: 20px; color: #051c32; margin: 0; font-weight: bold;">Key Highlights</h3>
                </div>
                <div style="background: #ffffff; padding: 10px; border-radius: 8px;">
                  ${program.keyHighlights.slice(0, 3).map(highlight => `
                    <div style="
                      display: flex; 
                      align-items: flex-start; 
                      margin-bottom: 15px;
                      background: #f8fafc;
                      padding: 12px;
                      border-radius: 8px;
                      border: 1px solid #e2e8f0;
                    ">
                      <div style="
                        width: 35px;
                        height: 35px;
                        background: #f59e0b;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                        flex-shrink: 0;
                        color: white;
                      ">
                        <i class="${highlight.icon || 'fas fa-star'}" style="font-size: 14px;"></i>
                      </div>
                      <div style="flex: 1;">
                        <h4 style="font-size: 14px; color: #051c32; margin: 0 0 8px 0; font-weight: bold;">${highlight.title}</h4>
                        <p style="font-size: 12px; color: #4b5563; margin: 0; line-height: 1.6;">${highlight.description}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Week by Week Progress Bar -->
            <div style="margin-bottom: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 8px; height: 40px; background: linear-gradient(to bottom, #f59e0b, #051c32); margin-right: 15px; border-radius: 4px;"></div>
                <h3 style="font-size: 20px; color: #051c32; margin: 0; font-weight: bold;">Foundation Phase (Weeks 1-2)</h3>
              </div>
              
              <div style="
                background: #f8fafc;
                border-radius: 12px;
                padding: 15px;
                margin-bottom: 15px;
                border: 1px solid #e2e8f0;
              ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 14px; font-weight: bold; color: #051c32;">
                    <i class="fas fa-calendar-alt" style="margin-right: 8px; color: #f59e0b;"></i>
                    Total Duration: ${program.duration}
                  </span>
                  <span style="font-size: 14px; font-weight: bold; color: #f59e0b;">
                    <i class="fas fa-tasks" style="margin-right: 8px;"></i>
                    ${program.modules ? program.modules.length : 8} Comprehensive Modules
                  </span>
                </div>
                <div style="
                  height: 6px;
                  background: linear-gradient(to right, #f59e0b, #051c32);
                  border-radius: 3px;
                "></div>
              </div>
            </div>

            <!-- First 2 Modules (Weeks 1-2) -->
            ${program.modules && program.modules.length > 0 ? `
              <div>
                ${program.modules.slice(0, 2).map((module, index) => `
                  <div style="
                    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 12px;
                    margin-bottom: 6px;
                    position: relative;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    min-height: auto;
                  ">
                    <!-- Week Number Badge -->
                    <div style="
                      position: absolute;
                      top: -10px;
                      left: 18px;
                      background: linear-gradient(135deg, #051c32 0%, #0f2847 100%);
                      color: white;
                      padding: 6px 12px;
                      border-radius: 16px;
                      font-weight: bold;
                      font-size: 11px;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    ">
                      <i class="fas fa-calendar-week" style="margin-right: 4px;"></i>
                      WEEK ${index + 1}
                    </div>

                    <!-- Module Icon -->
                    ${module.icon ? `
                      <div style="
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        width: 40px;
                        height: 40px;
                        background: linear-gradient(135deg, #f59e0b 0%, #fb923c 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        box-shadow: 0 3px 6px rgba(245, 158, 11, 0.3);
                      ">
                        <i class="${module.icon}" style="font-size: 16px;"></i>
                      </div>
                    ` : ''}

                    <!-- Module Content -->
                    <div style="margin-top: 10px; margin-right: 55px;">
                      <h4 style="
                        font-size: 15px; 
                        color: #051c32; 
                        margin: 0 0 8px 0; 
                        font-weight: bold;
                        line-height: 1.2;
                      ">${module.title}</h4>

                      ${module.description ? `
                        <div style="
                          background: rgba(245, 158, 11, 0.05);
                          border-left: 4px solid #f59e0b;
                          padding: 10px;
                          border-radius: 6px;
                          margin-bottom: 12px;
                        ">
                          <p style="font-size: 11px; color: #374151; margin: 0; line-height: 1.5; font-style: italic;">${module.description}</p>
                        </div>
                      ` : ''}

                      ${module.topics && module.topics.length > 0 ? `
                        <div>
                          <div style="display: flex; align-items: center; margin-bottom: 8px;">
                            <i class="fas fa-list-ul" style="color: #051c32; font-size: 11px; margin-right: 6px;"></i>
                            <span style="font-size: 11px; color: #051c32; font-weight: bold;">Learning Topics:</span>
                          </div>
                          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 4px;">
                            ${module.topics.map(topic => `
                              <div style="
                                background: white;
                                padding: 4px 6px;
                                border-radius: 4px;
                                border: 1px solid #e2e8f0;
                                display: flex;
                                align-items: center;
                              ">
                                <div style="
                                  width: 4px;
                                  height: 4px;
                                  background: #f59e0b;
                                  border-radius: 50%;
                                  margin-right: 5px;
                                  flex-shrink: 0;
                                "></div>
                                <span style="font-size: 8px; color: #4b5563; line-height: 1.2;">${topic}</span>
                              </div>
                            `).join('')}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- PAGE 3: CURRICULUM (WEEKS 3-5) -->
        <div style="
          width: 794px; 
          position: relative; 
          padding-top: 60px; 
          clear: both;
          background: white;
          margin: 15px;
          min-height: 1000px;
          max-height: 1122px;
          overflow: hidden;
        ">
          <!-- Small Logo at Top Right -->
          <div style="
            position: absolute;
            top: 10px;
            right: 30px;
            z-index: 10;
          ">
            <img src="/images/DarkLogo_TransparentBg.png" alt="ACMYX Logo" style="height: 25px; width: auto;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div style="display: none; font-size: 12px; font-weight: bold; color: #051c32;">ACMYX</div>
          </div>

          <!-- Header -->
          <div style="
            background: linear-gradient(135deg, #051c32 0%, #0f2847 100%);
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            color: white;
            margin: 20px;
            border-radius: 12px;
          ">
            <div>
              <h2 style="font-size: 24px; margin: 0; font-weight: bold; color: white;">Intermediate Development</h2>
              <p style="font-size: 12px; margin: 5px 0 0 0; opacity: 0.9;">Weeks 3-5: Building Skills</p>
            </div>
            <div style="
              width: 60px;
              height: 60px;
              background: rgba(245, 158, 11, 0.2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <i class="fas fa-cogs" style="font-size: 24px; color: #f59e0b;"></i>
            </div>
          </div>

          <!-- Content Container with margins -->
          <div style="margin: 20px; padding: 20px;">
            <!-- Progress Indicator -->
            <div style="margin-bottom: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 8px; height: 40px; background: linear-gradient(to bottom, #f59e0b, #051c32); margin-right: 15px; border-radius: 4px;"></div>
                <h3 style="font-size: 20px; color: #051c32; margin: 0; font-weight: bold;">Intermediate Phase (Weeks 3-5)</h3>
              </div>
              
              <div style="
                background: #f8fafc;
                border-radius: 12px;
                padding: 15px;
                margin-bottom: 15px;
                border: 1px solid #e2e8f0;
              ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 14px; font-weight: bold; color: #051c32;">
                    <i class="fas fa-chart-line" style="margin-right: 8px; color: #f59e0b;"></i>
                    Skills Development Phase
                  </span>
                  <span style="font-size: 14px; font-weight: bold; color: #f59e0b;">
                    <i class="fas fa-tools" style="margin-right: 8px;"></i>
                    Hands-on Practice
                  </span>
                </div>
                <div style="
                  height: 6px;
                  background: linear-gradient(to right, #f59e0b, #051c32);
                  border-radius: 3px;
                "></div>
              </div>
            </div>

            <!-- Modules 3-5 -->
            ${program.modules && program.modules.length > 2 ? `
              <div>
                ${program.modules.slice(2, 5).map((module, index) => `
                  <div style="
                    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 15px;
                    margin-bottom: 8px;
                    position: relative;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                  ">
                    <!-- Week Number Badge -->
                    <div style="
                      position: absolute;
                      top: -10px;
                      left: 18px;
                      background: linear-gradient(135deg, #051c32 0%, #0f2847 100%);
                      color: white;
                      padding: 6px 12px;
                      border-radius: 16px;
                      font-weight: bold;
                      font-size: 11px;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    ">
                      <i class="fas fa-calendar-week" style="margin-right: 4px;"></i>
                      WEEK ${index + 3}
                    </div>

                    <!-- Module Icon -->
                    ${module.icon ? `
                      <div style="
                        position: absolute;
                        top: 12px;
                        right: 18px;
                        width: 45px;
                        height: 45px;
                        background: linear-gradient(135deg, #f59e0b 0%, #fb923c 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        box-shadow: 0 3px 6px rgba(245, 158, 11, 0.3);
                      ">
                        <i class="${module.icon}" style="font-size: 18px;"></i>
                      </div>
                    ` : ''}

                    <!-- Module Content -->
                    <div style="margin-top: 12px; margin-right: 60px;">
                      <h4 style="
                        font-size: 16px; 
                        color: #051c32; 
                        margin: 0 0 10px 0; 
                        font-weight: bold;
                        line-height: 1.3;
                      ">${module.title}</h4>

                      ${module.description ? `
                        <div style="
                          background: rgba(245, 158, 11, 0.05);
                          border-left: 4px solid #f59e0b;
                          padding: 12px;
                          border-radius: 6px;
                          margin-bottom: 15px;
                        ">
                          <p style="font-size: 12px; color: #374151; margin: 0; line-height: 1.6; font-style: italic;">${module.description}</p>
                        </div>
                      ` : ''}

                      ${module.topics && module.topics.length > 0 ? `
                        <div>
                          <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <i class="fas fa-list-ul" style="color: #051c32; font-size: 12px; margin-right: 8px;"></i>
                            <span style="font-size: 12px; color: #051c32; font-weight: bold;">Learning Topics:</span>
                          </div>
                          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 5px;">
                            ${module.topics.map(topic => `
                              <div style="
                                background: white;
                                padding: 5px 8px;
                                border-radius: 5px;
                                border: 1px solid #e2e8f0;
                                display: flex;
                                align-items: center;
                              ">
                                <div style="
                                  width: 5px;
                                  height: 5px;
                                  background: #f59e0b;
                                  border-radius: 50%;
                                  margin-right: 6px;
                                  flex-shrink: 0;
                                "></div>
                                <span style="font-size: 9px; color: #4b5563; line-height: 1.3;">${topic}</span>
                              </div>
                            `).join('')}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- PAGE 4: CURRICULUM (WEEKS 6-8) -->
        <div style="
          width: 794px; 
          position: relative; 
          padding-top: 60px; 
          clear: both;
          background: white;
          margin: 15px;
          min-height: 1000px;
          max-height: 1122px;
          overflow: hidden;
        ">
          <!-- Small Logo at Top Right -->
          <div style="
            position: absolute;
            top: 10px;
            right: 30px;
            z-index: 10;
          ">
            <img src="/images/DarkLogo_TransparentBg.png" alt="ACMYX Logo" style="height: 25px; width: auto;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div style="display: none; font-size: 12px; font-weight: bold; color: #051c32;">ACMYX</div>
          </div>

          <!-- Header -->
          <div style="
            background: linear-gradient(135deg, #051c32 0%, #0f2847 100%);
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            color: white;
            margin: 20px;
            border-radius: 12px;
          ">
            <div>
              <h2 style="font-size: 24px; margin: 0; font-weight: bold; color: white;">Advanced Mastery</h2>
              <p style="font-size: 12px; margin: 5px 0 0 0; opacity: 0.9;">Weeks 6-8: Professional Level</p>
            </div>
            <div style="
              width: 60px;
              height: 60px;
              background: rgba(245, 158, 11, 0.2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <i class="fas fa-trophy" style="font-size: 24px; color: #f59e0b;"></i>
            </div>
          </div>

          <!-- Content Container with margins -->
          <div style="margin: 20px; padding: 20px;">
            <!-- Progress Indicator -->
            <div style="margin-bottom: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 8px; height: 40px; background: linear-gradient(to bottom, #f59e0b, #051c32); margin-right: 15px; border-radius: 4px;"></div>
                <h3 style="font-size: 20px; color: #051c32; margin: 0; font-weight: bold;">Advanced Phase (Weeks 6-8)</h3>
              </div>
              
              <div style="
                background: #f8fafc;
                border-radius: 12px;
                padding: 15px;
                margin-bottom: 15px;
                border: 1px solid #e2e8f0;
              ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 14px; font-weight: bold; color: #051c32;">
                    <i class="fas fa-rocket" style="margin-right: 8px; color: #f59e0b;"></i>
                    Professional Mastery
                  </span>
                  <span style="font-size: 14px; font-weight: bold; color: #f59e0b;">
                    <i class="fas fa-project-diagram" style="margin-right: 8px;"></i>
                    Real-world Projects
                  </span>
                </div>
                <div style="
                  height: 6px;
                  background: linear-gradient(to right, #f59e0b, #051c32);
                  border-radius: 3px;
                "></div>
              </div>
            </div>

            <!-- Modules 6-8 -->
            ${program.modules && program.modules.length > 5 ? `
              <div>
                ${program.modules.slice(5, 8).map((module, index) => `
                  <div style="
                    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 15px;
                    margin-bottom: 8px;
                    position: relative;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                  ">
                    <!-- Week Number Badge -->
                    <div style="
                      position: absolute;
                      top: -10px;
                      left: 18px;
                      background: linear-gradient(135deg, #051c32 0%, #0f2847 100%);
                      color: white;
                      padding: 6px 12px;
                      border-radius: 16px;
                      font-weight: bold;
                      font-size: 11px;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    ">
                      <i class="fas fa-calendar-week" style="margin-right: 4px;"></i>
                      WEEK ${index + 6}
                    </div>

                    <!-- Module Icon -->
                    ${module.icon ? `
                      <div style="
                        position: absolute;
                        top: 12px;
                        right: 18px;
                        width: 45px;
                        height: 45px;
                        background: linear-gradient(135deg, #f59e0b 0%, #fb923c 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        box-shadow: 0 3px 6px rgba(245, 158, 11, 0.3);
                      ">
                        <i class="${module.icon}" style="font-size: 18px;"></i>
                      </div>
                    ` : ''}

                    <!-- Module Content -->
                    <div style="margin-top: 12px; margin-right: 60px;">
                      <h4 style="
                        font-size: 16px; 
                        color: #051c32; 
                        margin: 0 0 10px 0; 
                        font-weight: bold;
                        line-height: 1.3;
                      ">${module.title}</h4>

                      ${module.description ? `
                        <div style="
                          background: rgba(245, 158, 11, 0.05);
                          border-left: 4px solid #f59e0b;
                          padding: 12px;
                          border-radius: 6px;
                          margin-bottom: 15px;
                        ">
                          <p style="font-size: 12px; color: #374151; margin: 0; line-height: 1.6; font-style: italic;">${module.description}</p>
                        </div>
                      ` : ''}

                      ${module.topics && module.topics.length > 0 ? `
                        <div>
                          <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <i class="fas fa-list-ul" style="color: #051c32; font-size: 12px; margin-right: 8px;"></i>
                            <span style="font-size: 12px; color: #051c32; font-weight: bold;">Learning Topics:</span>
                          </div>
                          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 5px;">
                            ${module.topics.map(topic => `
                              <div style="
                                background: white;
                                padding: 5px 8px;
                                border-radius: 5px;
                                border: 1px solid #e2e8f0;
                                display: flex;
                                align-items: center;
                              ">
                                <div style="
                                  width: 5px;
                                  height: 5px;
                                  background: #f59e0b;
                                  border-radius: 50%;
                                  margin-right: 6px;
                                  flex-shrink: 0;
                                "></div>
                                <span style="font-size: 9px; color: #4b5563; line-height: 1.3;">${topic}</span>
                              </div>
                            `).join('')}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- PAGE 5: PROJECTS & OUTCOMES -->
        <div style="
          width: 794px; 
          position: relative; 
          padding-top: 60px; 
          clear: both;
          background: white;
          margin: 15px;
          min-height: 800px;
          max-height: 1122px;
          overflow: hidden;
        ">
          <!-- Small Logo at Top Right -->
          <div style="
            position: absolute;
            top: 10px;
            right: 30px;
            z-index: 10;
          ">
            <img src="/images/DarkLogo_TransparentBg.png" alt="ACMYX Logo" style="height: 25px; width: auto;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div style="display: none; font-size: 12px; font-weight: bold; color: #051c32;">ACMYX</div>
          </div>

          <!-- Header -->
          <div style="
            background: linear-gradient(135deg, #051c32 0%, #0f2847 100%);
            height: 80px;
            display: flex;
            align-items: center;
            padding: 0 30px;
            color: white;
            margin: 20px;
            border-radius: 12px;
          ">
            <h2 style="font-size: 24px; margin: 0; font-weight: bold; color: white;">Projects & Career Outcomes</h2>
          </div>

          <!-- Content Container with margins -->
          <div style="margin: 20px; padding: 20px;">
            <!-- Additional Highlights -->
            ${program.keyHighlights && program.keyHighlights.length > 3 ? `
              <div style="margin-bottom: 30px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 6px; height: 20px; background: #f59e0b; margin-right: 15px;"></div>
                  <h3 style="font-size: 18px; color: #051c32; margin: 0; font-weight: bold;">Additional Benefits</h3>
                </div>
                ${program.keyHighlights.slice(3, 6).map(highlight => `
                  <div style="
                    background: #f8fafc;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                  ">
                    <div style="
                      width: 25px;
                      height: 25px;
                      background: #f59e0b;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin-right: 15px;
                      color: white;
                    ">
                      <i class="${highlight.icon || 'fas fa-check'}" style="font-size: 12px;"></i>
                    </div>
                    <div>
                      <h4 style="font-size: 12px; color: #051c32; margin: 0 0 3px 0; font-weight: bold;">${highlight.title}</h4>
                      <p style="font-size: 10px; color: #4b5563; margin: 0; line-height: 1.4;">${highlight.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Industry Projects -->
            ${program.projects && program.projects.length > 0 ? `
              <div style="margin-bottom: 30px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 6px; height: 20px; background: #051c32; margin-right: 15px;"></div>
                  <h3 style="font-size: 18px; color: #051c32; margin: 0; font-weight: bold;">Industry Projects</h3>
                </div>
                ${program.projects.slice(0, 3).map((project, index) => `
                  <div style="
                    background: #f8fafc;
                    border: 1px solid #051c32;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 12px;
                    position: relative;
                  ">
                    <div style="
                      position: absolute;
                      top: 8px;
                      left: 8px;
                      width: 20px;
                      height: 12px;
                      background: #f59e0b;
                      border-radius: 4px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: white;
                      font-size: 8px;
                      font-weight: bold;
                    ">${index + 1}</div>
                    
                    ${project.icon ? `
                      <div style="
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        width: 25px;
                        height: 25px;
                        background: #051c32;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                      ">
                        <i class="${project.icon}" style="font-size: 12px;"></i>
                      </div>
                    ` : ''}

                    <div style="margin-left: 30px; margin-right: 35px;">
                      <h4 style="font-size: 12px; color: #051c32; margin: 0 0 5px 0; font-weight: bold;">${project.title}</h4>
                      <p style="font-size: 10px; color: #4b5563; margin: 0; line-height: 1.4;">${project.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Learning Outcomes -->
            ${program.learningOutcomes && program.learningOutcomes.length > 0 ? `
              <div style="margin-bottom: 30px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 6px; height: 20px; background: #f59e0b; margin-right: 15px;"></div>
                  <h3 style="font-size: 18px; color: #051c32; margin: 0; font-weight: bold;">What You'll Learn</h3>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  ${program.learningOutcomes.slice(0, 6).map(outcome => `
                    <div style="display: flex; align-items: flex-start;">
                      <div style="
                        width: 12px;
                        height: 12px;
                        background: #f59e0b;
                        border-radius: 2px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 8px;
                        margin-top: 2px;
                        flex-shrink: 0;
                        color: white;
                        font-size: 8px;
                      ">✓</div>
                      <span style="font-size: 11px; color: #4b5563; line-height: 1.4;">${outcome}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Call to Action -->
            <div style="
              background: linear-gradient(135deg, #051c32 0%, #f59e0b 100%);
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              color: white;
              position: relative;
              margin-bottom: 20px;
            ">
              <div style="
                position: absolute;
                top: 20px;
                left: 25px;
                width: 40px;
                height: 40px;
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <i class="fas fa-graduation-cap" style="font-size: 20px; color: white;"></i>
              </div>
              
              <div style="
                position: absolute;
                top: 20px;
                right: 25px;
                width: 40px;
                height: 40px;
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <i class="fas fa-certificate" style="font-size: 20px; color: white;"></i>
              </div>

              <h3 style="font-size: 24px; margin: 0 0 12px 0; font-weight: bold; color: white;">Transform Your Career with ACMYX</h3>
              <p style="font-size: 14px; margin: 0; opacity: 0.9; color: white;">Join thousands of successful graduates</p>
              <p style="font-size: 14px; margin: 8px 0 0 0; opacity: 0.9; color: white;">Industry-recognized certification • Expert mentorship</p>
            </div>

            <!-- Footer -->
            <div style="
              background: #051c32;
              color: white;
              padding: 20px;
              border-radius: 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 12px;
            ">
              <!-- Logo Section -->
              <div style="display: flex; align-items: center;">
                <img src="/images/WhiteLogo_TransparentBg.png" alt="ACMYX Logo" style="height: 40px; width: auto;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div style="display: none; font-weight: bold; font-size: 24px; color: white;">ACMYX</div>
              </div>
              
              <!-- Contact Info -->
              <div style="display: flex; gap: 30px; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <i class="fas fa-envelope" style="font-size: 16px; margin-right: 10px; color: #f59e0b;"></i>
                  <span style="font-size: 12px; color: white;">acmyxteams@gmail.com</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <i class="fas fa-globe" style="font-size: 16px; margin-right: 10px; color: #f59e0b;"></i>
                  <span style="font-size: 12px; color: white;">www.acmyx.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Create temporary container
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = createBrochureHTML();
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '-9999px';
  document.body.appendChild(tempContainer);

  const pdfContent = tempContainer.querySelector('#pdf-content');

  try {
    // Wait for images to load
    const images = pdfContent.querySelectorAll('img');
    await Promise.all(Array.from(images).map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 3000); // Timeout after 3 seconds
        }
      });
    }));

    // Generate PDF with proper page handling
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      precision: 16
    });
    
    const pages = pdfContent.children;
    let isFirstPage = true;

    for (let i = 0; i < pages.length; i++) {
      if (!isFirstPage) {
        pdf.addPage();
      }

      // Create a separate container for each page to avoid overlap
      const pageContainer = document.createElement('div');
      pageContainer.style.position = 'absolute';
      pageContainer.style.left = '-9999px';
      pageContainer.style.top = '-9999px';
      pageContainer.style.width = '794px';
      pageContainer.style.backgroundColor = '#ffffff';
      pageContainer.style.overflow = 'hidden';
      pageContainer.innerHTML = pages[i].outerHTML;
      document.body.appendChild(pageContainer);

      // Get the page element and ensure proper dimensions
      const element = pageContainer.firstChild;
      
      // Force a specific height to prevent stretching
      element.style.minHeight = 'auto';
      element.style.maxHeight = 'none';
      element.style.height = 'auto';
      
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: element.scrollHeight,
        logging: false,
        removeContainer: true,
        foreignObjectRendering: false,
        imageTimeout: 5000,
        scrollX: 0,
        scrollY: 0,
        letterRendering: true,
        onclone: function(clonedDoc) {
          // Ensure proper styling in cloned document
          const clonedElement = clonedDoc.body.querySelector('div');
          if (clonedElement) {
            clonedElement.style.width = '794px';
            clonedElement.style.transform = 'none';
            clonedElement.style.transformOrigin = 'top left';
          }
          
          // Remove any problematic positioning
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach(el => {
            if (el.style.position === 'fixed') {
              el.style.position = 'relative';
            }
          });
        }
      });

      // Clean up the temporary container
      document.body.removeChild(pageContainer);

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Calculate proper dimensions to maintain aspect ratio
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Ensure content fits on page without excessive splitting
      const maxPageHeight = 297; // A4 height in mm
      
      if (imgHeight <= maxPageHeight) {
        // Content fits on one page
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
        isFirstPage = false;
      } else {
        // Content is too tall - this shouldn't happen with our page structure
        // If it does, we'll scale it to fit
        const scaledHeight = maxPageHeight;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, scaledHeight, undefined, 'FAST');
        isFirstPage = false;
      }
    }

    // Download PDF
    const filename = `ACMYX_${program.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_brochure.pdf`;
    pdf.save(filename);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    // Clean up
    document.body.removeChild(tempContainer);
  }
};