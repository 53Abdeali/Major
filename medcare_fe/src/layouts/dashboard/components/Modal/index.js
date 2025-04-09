import React, { useState } from "react";
import { Button, Modal, Select, Tag, message } from "antd";
import { useTranslation } from "react-i18next";
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import recommendationService from "services/recommendation.service";
const tagRender = (props) => {
  const { label, closable, onClose } = props;
  return (
    <Tag closable={closable} onClose={onClose} style={{ marginInlineEnd: 4 }}>
      {label}
    </Tag>
  );
};

const AddRecommendationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [hideSelect, setHideSelect] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation();
  const options = [
    { value: "itching", label: t("symptoms.itching") },
    { value: "skin_rash", label: t("symptoms.skin_rash") },
    {
      value: "nodal_skin_eruptions",
      label: t("symptoms.nodal_skin_eruptions"),
    },
    { value: "continuous_sneezing", label: t("symptoms.continuous_sneezing") },
    { value: "shivering", label: t("symptoms.shivering") },
    { value: "chills", label: t("symptoms.chills") },
    { value: "joint_pain", label: t("symptoms.joint_pain") },
    { value: "stomach_pain", label: t("symptoms.stomach_pain") },
    { value: "acidity", label: t("symptoms.acidity") },
    { value: "ulcers_on_tongue", label: t("symptoms.ulcers_on_tongue") },
    { value: "muscle_wasting", label: t("symptoms.muscle_wasting") },
    { value: "vomiting", label: t("symptoms.vomiting") },
    { value: "burning_micturition", label: t("symptoms.burning_micturition") },
    { value: "spotting_urination", label: t("symptoms.spotting_urination") },
    { value: "fatigue", label: t("symptoms.fatigue") },
    { value: "weight_gain", label: t("symptoms.weight_gain") },
    { value: "anxiety", label: t("symptoms.anxiety") },
    {
      value: "cold_hands_and_feets",
      label: t("symptoms.cold_hands_and_feets"),
    },
    { value: "mood_swings", label: t("symptoms.mood_swings") },
    { value: "weight_loss", label: t("symptoms.weight_loss") },
    { value: "restlessness", label: t("symptoms.restlessness") },
    { value: "lethargy", label: t("symptoms.lethargy") },
    { value: "patches_in_throat", label: t("symptoms.patches_in_throat") },
    {
      value: "irregular_sugar_level",
      label: t("symptoms.irregular_sugar_level"),
    },
    { value: "cough", label: t("symptoms.cough") },
    { value: "high_fever", label: t("symptoms.high_fever") },
    { value: "sunken_eyes", label: t("symptoms.sunken_eyes") },
    { value: "breathlessness", label: t("symptoms.breathlessness") },
    { value: "sweating", label: t("symptoms.sweating") },
    { value: "dehydration", label: t("symptoms.dehydration") },
    { value: "indigestion", label: t("symptoms.indigestion") },
    { value: "headache", label: t("symptoms.headache") },
    { value: "yellowish_skin", label: t("symptoms.yellowish_skin") },
    { value: "dark_urine", label: t("symptoms.dark_urine") },
    { value: "nausea", label: t("symptoms.nausea") },
    { value: "loss_of_appetite", label: t("symptoms.loss_of_appetite") },
    {
      value: "pain_behind_the_eyes",
      label: t("symptoms.pain_behind_the_eyes"),
    },
    { value: "back_pain", label: t("symptoms.back_pain") },
    { value: "constipation", label: t("symptoms.constipation") },
    { value: "abdominal_pain", label: t("symptoms.abdominal_pain") },
    { value: "diarrhoea", label: t("symptoms.diarrhoea") },
    { value: "mild_fever", label: t("symptoms.mild_fever") },
    { value: "yellow_urine", label: t("symptoms.yellow_urine") },
    { value: "yellowing_of_eyes", label: t("symptoms.yellowing_of_eyes") },
    { value: "acute_liver_failure", label: t("symptoms.acute_liver_failure") },
    { value: "fluid_overload", label: t("symptoms.fluid_overload") },
    { value: "swelling_of_stomach", label: t("symptoms.swelling_of_stomach") },
    { value: "swelled_lymph_nodes", label: t("symptoms.swelled_lymph_nodes") },
    { value: "malaise", label: t("symptoms.malaise") },
    {
      value: "blurred_and_distorted_vision",
      label: t("symptoms.blurred_and_distorted_vision"),
    },
    { value: "phlegm", label: t("symptoms.phlegm") },
    { value: "throat_irritation", label: t("symptoms.throat_irritation") },
    { value: "redness_of_eyes", label: t("symptoms.redness_of_eyes") },
    { value: "sinus_pressure", label: t("symptoms.sinus_pressure") },
    { value: "runny_nose", label: t("symptoms.runny_nose") },
    { value: "congestion", label: t("symptoms.congestion") },
    { value: "chest_pain", label: t("symptoms.chest_pain") },
    { value: "weakness_in_limbs", label: t("symptoms.weakness_in_limbs") },
    { value: "fast_heart_rate", label: t("symptoms.fast_heart_rate") },
    {
      value: "pain_during_bowel_movements",
      label: t("symptoms.pain_during_bowel_movements"),
    },
    { value: "pain_in_anal_region", label: t("symptoms.pain_in_anal_region") },
    { value: "bloody_stool", label: t("symptoms.bloody_stool") },
    { value: "irritation_in_anus", label: t("symptoms.irritation_in_anus") },
    { value: "neck_pain", label: t("symptoms.neck_pain") },
    { value: "dizziness", label: t("symptoms.dizziness") },
    { value: "cramps", label: t("symptoms.cramps") },
    { value: "bruising", label: t("symptoms.bruising") },
    { value: "obesity", label: t("symptoms.obesity") },
    { value: "swollen_legs", label: t("symptoms.swollen_legs") },
    {
      value: "swollen_blood_vessels",
      label: t("symptoms.swollen_blood_vessels"),
    },
    { value: "puffy_face_and_eyes", label: t("symptoms.puffy_face_and_eyes") },
    { value: "enlarged_thyroid", label: t("symptoms.enlarged_thyroid") },
    { value: "brittle_nails", label: t("symptoms.brittle_nails") },
    { value: "swollen_extremeties", label: t("symptoms.swollen_extremeties") },
    { value: "excessive_hunger", label: t("symptoms.excessive_hunger") },
    {
      value: "extra_marital_contacts",
      label: t("symptoms.extra_marital_contacts"),
    },
    {
      value: "drying_and_tingling_lips",
      label: t("symptoms.drying_and_tingling_lips"),
    },
    { value: "slurred_speech", label: t("symptoms.slurred_speech") },
    { value: "knee_pain", label: t("symptoms.knee_pain") },
    { value: "hip_joint_pain", label: t("symptoms.hip_joint_pain") },
    { value: "muscle_weakness", label: t("symptoms.muscle_weakness") },
    { value: "stiff_neck", label: t("symptoms.stiff_neck") },
    { value: "swelling_joints", label: t("symptoms.swelling_joints") },
    { value: "movement_stiffness", label: t("symptoms.movement_stiffness") },
    { value: "spinning_movements", label: t("symptoms.spinning_movements") },
    { value: "loss_of_balance", label: t("symptoms.loss_of_balance") },
    { value: "unsteadiness", label: t("symptoms.unsteadiness") },
    {
      value: "weakness_of_one_body_side",
      label: t("symptoms.weakness_of_one_body_side"),
    },
    { value: "loss_of_smell", label: t("symptoms.loss_of_smell") },
    { value: "bladder_discomfort", label: t("symptoms.bladder_discomfort") },
    { value: "foul_smell_of_urine", label: t("symptoms.foul_smell_of_urine") },
    {
      value: "continuous_feel_of_urine",
      label: t("symptoms.continuous_feel_of_urine"),
    },
    { value: "passage_of_gases", label: t("symptoms.passage_of_gases") },
    { value: "internal_itching", label: t("symptoms.internal_itching") },
    { value: "toxic_look_(typhos)", label: t("symptoms.toxic_look_typhos") },
    { value: "depression", label: t("symptoms.depression") },
    { value: "irritability", label: t("symptoms.irritability") },
    { value: "muscle_pain", label: t("symptoms.muscle_pain") },
    { value: "altered_sensorium", label: t("symptoms.altered_sensorium") },
    { value: "red_spots_over_body", label: t("symptoms.red_spots_over_body") },
    { value: "belly_pain", label: t("symptoms.belly_pain") },
    {
      value: "abnormal_menstruation",
      label: t("symptoms.abnormal_menstruation"),
    },
    { value: "dischromic _patches", label: t("symptoms.dischromic_patches") },
    { value: "watering_from_eyes", label: t("symptoms.watering_from_eyes") },
    { value: "increased_appetite", label: t("symptoms.increased_appetite") },
    { value: "polyuria", label: t("symptoms.polyuria") },
    { value: "family_history", label: t("symptoms.family_history") },
    { value: "mucoid_sputum", label: t("symptoms.mucoid_sputum") },
    { value: "rusty_sputum", label: t("symptoms.rusty_sputum") },
    {
      value: "lack_of_concentration",
      label: t("symptoms.lack_of_concentration"),
    },
    { value: "visual_disturbances", label: t("symptoms.visual_disturbances") },
    {
      value: "receiving_blood_transfusion",
      label: t("symptoms.receiving_blood_transfusion"),
    },
    {
      value: "receiving_unsterile_injections",
      label: t("symptoms.receiving_unsterile_injections"),
    },
    { value: "coma", label: t("symptoms.coma") },
    { value: "stomach_bleeding", label: t("symptoms.stomach_bleeding") },
    {
      value: "distention_of_abdomen",
      label: t("symptoms.distention_of_abdomen"),
    },
    {
      value: "history_of_alcohol_consumption",
      label: t("symptoms.history_of_alcohol_consumption"),
    },
    { value: "fluid_overload.1", label: t("symptoms.fluid_overload_1") },
    { value: "blood_in_sputum", label: t("symptoms.blood_in_sputum") },
    {
      value: "prominent_veins_on_calf",
      label: t("symptoms.prominent_veins_on_calf"),
    },
    { value: "palpitations", label: t("symptoms.palpitations") },
    { value: "painful_walking", label: t("symptoms.painful_walking") },
    { value: "pus_filled_pimples", label: t("symptoms.pus_filled_pimples") },
    { value: "blackheads", label: t("symptoms.blackheads") },
    { value: "scurring", label: t("symptoms.scurring") },
    { value: "skin_peeling", label: t("symptoms.skin_peeling") },
    { value: "silver_like_dusting", label: t("symptoms.silver_like_dusting") },
    {
      value: "small_dents_in_nails",
      label: t("symptoms.small_dents_in_nails"),
    },
    { value: "inflammatory_nails", label: t("symptoms.inflammatory_nails") },
    { value: "blister", label: t("symptoms.blister") },
    {
      value: "red_sore_around_nose",
      label: t("symptoms.red_sore_around_nose"),
    },
    { value: "yellow_crust_ooze", label: t("symptoms.yellow_crust_ooze") },
  ];
  const showModal = () => {
    setIsModalOpen(true);
    setHideSelect(false); // Reset state on opening
    setResult(null);
  };

  const handleOk = async () => {
    console.log("Inside handle ok")
    setLoading(true)
    const query = selectedValues.join(",");
    try {
      const response = await recommendationService.createRecommendation({query})
      if (response?.status_code === 200) {
        message.success("Submission successful!");
        setLoading(false);
        setIsModalOpen(false);
        setResult(response?.data?.disease || "Success!"); // Store API result or custom message
      } else {
        throw new Error("Failed response");
      }
    } catch (error) {
      console.log(error)
      message.error("Submission failed, please try again.");
      setLoading(false);
      setHideSelect(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (values) => {
    setSelectedValues(values);
  };

  return (
    <>
      <div
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <MDBox>
          <MDButton
            variant="gradient"
            startIcon={<LocalHospitalRoundedIcon />}
            color="info"
            type="button"
            onClick={showModal}
          >
            Aid
          </MDButton>
        </MDBox>
        <Modal
          title="Select Symptoms"
          open={isModalOpen}
          onOk={handleOk}
          loading={loading}
          onCancel={handleCancel}
        >
          {hideSelect ? (
            <p style={{ fontWeight: "bold", color: "green" }}>
              Result: {result}
            </p>
          ) : (
            <Select
              mode="multiple"
              tagRender={tagRender}
              onChange={handleChange}
              value={selectedValues}
              style={{ width: "100%" }}
              options={options}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default AddRecommendationModal;
