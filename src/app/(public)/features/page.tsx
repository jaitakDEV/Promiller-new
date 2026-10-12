import React from "react";
import FeatherComp from "@/features/public/components/feature-page/FeatureComp";
import FeaturesLiveMonitoring from "@/features/public/components/feature-page/FeaturesLiveMonitoring";
import EnergyMonitoring from "@/features/public/components/feature-page/EnergyMonitoring";
import PredictiveMaintenance from "@/features/public/components/feature-page/PredictiveMaintenance";
import MachineHealthScore from "@/features/public/components/feature-page/MachineHealthScore";
import SafetyAlerts from "@/features/public/components/feature-page/SafetyAlerts";
// import RemoteControl from '@/features/public/components/RemoteControl'
import SmartControl from "@/features/public/components/feature-page/SmartControl";
import MultiDeviceSync from "@/features/public/components/feature-page/MultiDeviceSync";
import Highlights from "@/features/public/components/feature-page/Highlights";
const page = () => {
  return (
    <>
      <FeatherComp />
      <Highlights />
      <FeaturesLiveMonitoring />
      <EnergyMonitoring />
      <PredictiveMaintenance />
      <MachineHealthScore />
      <SafetyAlerts />
      {/* <RemoteControl /> */}
      <SmartControl />
      <MultiDeviceSync />
    </>
  );
};

export default page;
