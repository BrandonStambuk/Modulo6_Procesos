import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CommonArea } from "../interfaces/common-areas";

interface Props {
  isEditing?: boolean;
  id?: number;
}

const BASE_URL = "http://localhost:8000";

export default function useCreateCommonArea(
  { isEditing, id }: Props = {
    isEditing: false,
    id: undefined,
  }
) {
  const [error, setError] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [schedule, setSchedule] = useState<
    { day: number; startHour: string; endHour: string; isChecked: boolean }[]
  >([
    { day: 1, startHour: "", endHour: "", isChecked: false },
    { day: 2, startHour: "", endHour: "", isChecked: false },
    { day: 3, startHour: "", endHour: "", isChecked: false },
    { day: 4, startHour: "", endHour: "", isChecked: false },
    { day: 5, startHour: "", endHour: "", isChecked: false },
    { day: 6, startHour: "", endHour: "", isChecked: false },
    { day: 7, startHour: "", endHour: "", isChecked: false },
  ]);
  const [policy, setPolicy] = useState<string>("");
  const [policies, setPolicies] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [urlImage, setUrlImage] = useState<string>("");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [oldData, setOldData] = useState<CommonArea | null>(null);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);

  useEffect(() => {
    verifyChanges();
  }, [name, description, capacity, schedule, policies, policy, oldData]);

  const verifyChanges = () => {
    if (oldData) {
      const {
        name: oldName,
        description: oldDescription,
        capacity: oldCapacity,
        schedule: oldSchedule,
        policies: oldPolicies,
      } = oldData;

      let change =
        name !== oldName ||
        description !== oldDescription ||
        capacity !== oldCapacity;

      oldSchedule.forEach((element) => {
        const found = schedule.find((item) => item.day === element.day);
        if (found) {
          change =
            change ||
            found.startHour !== element.startHour ||
            found.endHour !== element.endHour;
        }
      });

      change = change || policies.length !== oldPolicies.length;

      policies.forEach((element, index) => {
        change = change || element !== oldPolicies[index];
      });

      setEnableEdit(change);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCapacity(parseInt(e.target.value));
  };

  const handleStartHourChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index].startHour = e.target.value;
    setSchedule(newSchedule);
  };

  const handleEndHourChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index].endHour = e.target.value;
    setSchedule(newSchedule);
  };

  const handleCheckboxChange = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isChecked = !newSchedule[index].isChecked;
    setSchedule(newSchedule);
  };

  const handlePolicyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPolicy(e.target.value);
  };

  const handleAddPolicy = () => {
    if (policy.trim() !== "") {
      setPolicies([...policies, policy]);
      setPolicy("");
    }
  };

  const deletePolicy = (index: number) => {
    const newPolicies = policies.filter((_, i) => i !== index);
    setPolicies(newPolicies);
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      console.log(files[0]);
      const url = URL.createObjectURL(files[0]);
      setUrlImage(url);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedSchedule = schedule.filter((horario) => horario.isChecked);
    const scheduleForm = selectedSchedule.map((horario) => ({
      day: horario.day,
      startHour: horario.startHour,
      endHour: horario.endHour,
    }));

    const reader = new FileReader();

    reader.onload = async () => {
      const base64File = reader.result;
      const formData = {
        name: name,
        description: description,
        capacity: capacity,
        schedule: scheduleForm,
        policies: policies,
        file: base64File,
      };
      const URL = `${BASE_URL}/api/common-areas/${id ? id : ""}`;
      const method = isEditing ? "PATCH" : "POST";
      try {
        setError("");
        setErrors([]);
        setSubmitting(true);

        const response = await fetch(URL, {
          method,
          headers: {
            "Content-Type": "application/json, multipart/form-data",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        const statusCode = response.status;

        if (statusCode !== 201 && statusCode !== 200) {
          throw await response.json();
        }

        if (!isEditing) {
          setName("");
          setDescription("");
          setCapacity(0);
          setSchedule(
            schedule.map((horario) => ({
              ...horario,
              startHour: "",
              endHour: "",
              isChecked: false,
            }))
          );
          setPolicy("");
          setPolicies([]);
          setFile(null);
          setUrlImage("");
        }

        Swal.fire({
          title: ` ${isEditing ? "Actualización" : "Registro"} exitoso`,
          text: `El área común ha sido ${
            isEditing ? "actualizada" : "registrada"
          } correctamente`,
          icon: "success",
        });
      } catch (error: any) {
        const { message, errors } = error;
        if (errors) {
          setErrors(errors);
        }
        setError(message);
      } finally {
        setSubmitting(false);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setError("Debe seleccionar una imagen");
    }
  };

  const setData = (commonArea: CommonArea) => {
    const { name, description, capacity, schedule, policies } = commonArea;
    setName(name);
    setDescription(description);
    setCapacity(capacity);
    setSchedule((prev) => {
      return prev.map((horario) => {
        const found = schedule.find((item) => item.day === horario.day);
        if (found) {
          return {
            ...horario,
            startHour: found.startHour,
            endHour: found.endHour,
            isChecked: true,
          };
        }
        return horario;
      });
    });
    setPolicies(policies);
    const { urlImage } = commonArea;
    setUrlImage(`${BASE_URL}/${urlImage}`);
    const image = new File([urlImage], "image.jpg", { type: "image/jpg" });
    setFile(image);
  };

  return {
    error,
    errors,
    name,
    description,
    capacity,
    horarios: schedule,
    policy,
    policies,
    submitting,
    enableEdit,
    file,
    urlImage,
    oldData,
    setName: handleNameChange,
    setDescription: handleDescriptionChange,
    setCapacity: handleCapacityChange,
    setStartHour: handleStartHourChange,
    setEndHour: handleEndHourChange,
    setCheckbox: handleCheckboxChange,
    setPolicy: handlePolicyChange,
    addPolicy: handleAddPolicy,
    handleSubmit,
    setData,
    setOldData,
    deletePolicy,
    setFile: handleUploadFile,
  };
}
