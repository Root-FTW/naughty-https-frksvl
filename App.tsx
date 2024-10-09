
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, RefreshCw, DollarSign, Target, Eye, MousePointer } from 'lucide-react';

const AdOpsTools = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('cpm');
  
  // CPM Calculator State
  const [totalCost, setTotalCost] = useState('');
  const [cpm, setCPM] = useState('');
  const [impressions, setImpressions] = useState('');
  const [cpmResult, setCpmResult] = useState(null);

  // CTR Calculator State
  const [ctrImpressions, setCtrImpressions] = useState('');
  const [clicks, setClicks] = useState('');
  const [ctrResult, setCtrResult] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const calculateCPM = () => {
    let calculatedResult;
    if (totalCost && cpm) {
      calculatedResult = Number(totalCost) / (Number(cpm) / 1000);
      setCpmResult({ value: calculatedResult, label: 'Impresiones', icon: <Eye className="w-6 h-6" /> });
      setImpressions(calculatedResult.toFixed(0));
    } else if (totalCost && impressions) {
      calculatedResult = (Number(totalCost) / Number(impressions)) * 1000;
      setCpmResult({ value: calculatedResult, label: 'CPM', icon: <Target className="w-6 h-6" /> });
      setCPM(calculatedResult.toFixed(2));
    } else if (cpm && impressions) {
      calculatedResult = (Number(cpm) / 1000) * Number(impressions);
      setCpmResult({ value: calculatedResult, label: 'Costo Total', icon: <DollarSign className="w-6 h-6" /> });
      setTotalCost(calculatedResult.toFixed(2));
    }
  };

  const calculateCTR = () => {
    if (ctrImpressions && clicks) {
      const ctr = (Number(clicks) / Number(ctrImpressions)) * 100;
      setCtrResult({ value: ctr, label: 'CTR', icon: <MousePointer className="w-6 h-6" /> });
    }
  };

  const resetCPM = () => {
    setTotalCost('');
    setCPM('');
    setImpressions('');
    setCpmResult(null);
  };

  const resetCTR = () => {
    setCtrImpressions('');
    setClicks('');
    setCtrResult(null);
  };

  const InputWithIcon = ({ icon, value, onChange, placeholder }) => (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          const re = /^[0-9]*\.?[0-9]*$/;
          if (e.target.value === '' || re.test(e.target.value)) {
            onChange(e.target.value);
          }
        }}
        placeholder={placeholder}
        className={`pl-10 w-full py-2 text-lg rounded-lg border ${
          darkMode 
            ? 'bg-gray-700 text-white border-gray-600' 
            : 'bg-white text-gray-800 border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} transition-colors duration-200 p-4`}>
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg">
        <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AdOps Tools</h1>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="ml-4"
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <TabsTrigger value="cpm" className="rounded-md py-2 text-sm">Calculadora CPM</TabsTrigger>
              <TabsTrigger value="ctr" className="rounded-md py-2 text-sm">Calculadora CTR</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cpm">
              <CardContent className="p-0">
                <InputWithIcon
                  icon={<DollarSign className="w-5 h-5" />}
                  value={totalCost}
                  onChange={setTotalCost}
                  placeholder="Costo Total"
                />
                <InputWithIcon
                  icon={<Target className="w-5 h-5" />}
                  value={cpm}
                  onChange={setCPM}
                  placeholder="CPM"
                />
                <InputWithIcon
                  icon={<Eye className="w-5 h-5" />}
                  value={impressions}
                  onChange={setImpressions}
                  placeholder="Impresiones"
                />
                
                <div className="flex space-x-4 mt-6">
                  <Button onClick={resetCPM} variant="outline" className="flex-1 py-2">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reiniciar
                  </Button>
                  <Button onClick={calculateCPM} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2">
                    Calcular <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                {cpmResult && (
                  <div className={`${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'} border p-4 rounded-lg shadow-md mt-4 animate-fade-in`}>
                    <div className="flex items-center space-x-3">
                      {cpmResult.icon}
                      <div>
                        <p className="text-sm font-medium">{cpmResult.label}</p>
                        <p className="text-2xl font-bold">{cpmResult.value.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="ctr">
              <CardContent className="p-0">
                <InputWithIcon
                  icon={<Eye className="w-5 h-5" />}
                  value={ctrImpressions}
                  onChange={setCtrImpressions}
                  placeholder="Impresiones"
                />
                <InputWithIcon
                  icon={<MousePointer className="w-5 h-5" />}
                  value={clicks}
                  onChange={setClicks}
                  placeholder="Clicks"
                />
                
                <div className="flex space-x-4 mt-6">
                  <Button onClick={resetCTR} variant="outline" className="flex-1 py-2">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reiniciar
                  </Button>
                  <Button onClick={calculateCTR} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2">
                    Calcular <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                {ctrResult && (
                  <div className={`${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'} border p-4 rounded-lg shadow-md mt-4 animate-fade-in`}>
                    <div className="flex items-center space-x-3">
                      {ctrResult.icon}
                      <div>
                        <p className="text-sm font-medium">{ctrResult.label}</p>
                        <p className="text-2xl font-bold">{ctrResult.value.toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default AdOpsTools;
