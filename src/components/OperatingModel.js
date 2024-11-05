import React, { useState, useRef } from 'react';
import { Globe2, Users, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, X } from 'lucide-react';

const InfoPanel = ({ node, country, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-96 bg-white rounded-lg shadow-xl border border-gray-200 font-everett">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                {node.name}
                {country && ` - ${country}`}
              </h2>
              <p className="text-sm text-gray-500">
                {country || 'Global'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Globe2 className="w-5 h-5" />
              <h3 className="font-medium">Global Leader</h3>
            </div>
            <p className="text-gray-500 pl-7">TBD</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-5 h-5" />
              <h3 className="font-medium">Key Contacts</h3>
            </div>
            <p className="text-gray-500 italic pl-7">Region Leaders TBA</p>
          </div>

          {node.details && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Components</h3>
              <div className="space-y-1">
                {node.details.map((detail, index) => (
                  <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OperatingModel = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [expandedSections, setExpandedSections] = useState(new Set());
  const scrollContainerRef = useRef(null);

  const countries = [
    'Global', 'US', 'UKI', 'Canada', 'Iberia',
    'France', 'Italy', 'Germany', 'India', 'SM', 'Japan'
  ];

  const sections = {
    CONSULT_PROPOSITIONS: {
      name: 'Consult Propositions',
      color: '#29707A',
      bgColor: 'bg-gray-50',
      textColor: 'text-white',
      subsections: {
        GLOBAL: { 
          color: '#3E8975', 
          name: 'Global Practices',
          items: [
            { id: 'cloud', name: 'Cloud' },
            { id: 'adai', name: 'Enterprise Services (ADAI)' },
            { id: 'corez', name: 'CoreZ' },
            { id: 'dws', name: 'DWS' },
            { id: 'network', name: 'Network & Edge' },
            { id: 'secres', name: 'Sec & Res' }
          ]
        },
        SERVICE: { 
          color: '#2D7261', 
          name: 'Service Lines',
          textColor: 'text-white',
          items: [
            { 
              id: 'transform', 
              name: 'Enterprise Transformation',
              details: ['EA', 'PPM', 'Change', 'IT Strategy', 'Process', 'Bridge Insights']
            },
            { 
              id: 'dataai', 
              name: 'Data and AI',
              details: ['Analytics', 'ML', 'Data Strategy']
            }
          ]
        }
      }
    },
    ENABLING: { 
      color: '#76B5A8', 
      name: 'Enabling Capabilities',
      textColor: 'text-white',
      items: [
        { 
          id: 'growth', 
          name: 'Growth',
          details: ['Investment cases', 'GTM', 'Sales Hub', 'Knowledge mgmt']
        },
        { id: 'collab', name: 'Collaboratives' },
        { id: 'industry', name: 'Industry' },
        { 
          id: 'workforce', 
          name: 'Consulting Workforce',
          details: ['Professions', 'Training', 'Career paths', 'Skills']
        },
        { id: 'methods', name: 'Methods & Tools' }
      ]
    },
    CHANNELS: { 
      color: '#CCE3F0', 
      name: 'Channels to Market',
      bgColor: 'bg-gray-50',
      textColor: 'text-black',
      items: [
        { id: 'partners', name: 'Consult Partners' },
        { id: 'vital', name: 'Vital' },
        { id: 'alliances', name: 'Alliances' },
        { id: 'kyndryl', name: 'Kyndryl Institute' },
        { id: 'cvp', name: 'Value Proposition' }
      ]
    }
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  const toggleSection = (sectionKey, subsectionKey = null) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      const key = subsectionKey ? `${sectionKey}-${subsectionKey}` : sectionKey;
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const renderItems = (items, parentKey) => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`p-3 rounded border transition-colors cursor-pointer
            ${selectedNode?.id === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
          onClick={() => setSelectedNode(selectedNode?.id === item.id ? null : item)}
        >
          <div className="font-medium text-sm">{item.name}</div>
          {item.details && (
            <div className="mt-2 text-xs text-gray-500">
              {item.details.join(' • ')}
            </div>
          )}
          {selectedCountry && (
            <div className="mt-2 text-xs text-blue-600">
              {selectedCountry}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSection = (sectionKey, section) => {
    const isConsultPropositions = sectionKey === 'CONSULT_PROPOSITIONS';
    const sectionClassName = `rounded-lg border border-gray-200 ${section.bgColor || ''} p-4 mb-6`;

    return (
      <div key={sectionKey} className={sectionClassName}>
        <div 
          className="flex items-center gap-2 mb-4 cursor-pointer"
          onClick={() => toggleSection(sectionKey)}
        >
          <div 
            className={`w-48 p-3 rounded font-medium flex items-center justify-between ${section.textColor}`}
            style={{ backgroundColor: section.color }}
          >
            <span>{section.name}</span>
            {expandedSections.has(sectionKey) ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
          <div className="flex-1 h-10 border-b border-dashed border-gray-300" />
        </div>

        {expandedSections.has(sectionKey) && (
          <div className={`${isConsultPropositions ? 'ml-8' : 'ml-48'}`}>
            {isConsultPropositions ? (
              Object.entries(section.subsections).map(([key, subsection]) => (
                <div key={key} className="mb-4 last:mb-0">
                  <div 
                    className="flex items-center gap-2 mb-2 cursor-pointer"
                    onClick={() => toggleSection('CONSULT_PROPOSITIONS', key)}
                  >
                    <div 
                      className="w-48 p-3 rounded font-medium text-white flex items-center justify-between"
                      style={{ backgroundColor: subsection.color }}
                    >
                      <span>{subsection.name}</span>
                      {expandedSections.has(`CONSULT_PROPOSITIONS-${key}`) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 h-10 border-b border-dashed border-gray-300" />
                  </div>

                  {expandedSections.has(`CONSULT_PROPOSITIONS-${key}`) && (
                    <div className="ml-48">
                      {renderItems(subsection.items, `${sectionKey}-${key}`)}
                    </div>
                  )}
                </div>
              ))
            ) : (
              renderItems(section.items, sectionKey)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm font-everett">
      <div className="p-4 border-b">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Consult Operating Model Horizon 1:</h1>
          <span className="text-red-500 text-xl">Run and transform with clear accountability in each country</span>
        </div>
      </div>

      <div className="relative">
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden relative"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="inline-block min-w-max p-4">
            <div className="flex gap-2 mb-6 ml-48">
              {countries.map((country) => (
                <div
                  key={country}
                  className={`w-24 p-2 rounded border text-xs font-medium text-center cursor-pointer
                    ${selectedCountry === country 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
                  onClick={() => setSelectedCountry(selectedCountry === country ? null : country)}
                >
                  {country}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {Object.entries(sections).map(([sectionKey, section]) => 
                renderSection(sectionKey, section)
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedNode && (
        <InfoPanel 
          node={selectedNode}
          country={selectedCountry}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
};

export default OperatingModel;