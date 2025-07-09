import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import formFields from '../data/form_fields/2025.js';
import FormViewer from './FormViewer';
import ScoutingForm from './ScoutingForm';

const FORMS_STORAGE_KEY = '@frcScoutingApp:submittedForms';

const createEmptyFormData = () => {
  const initialFormData: Record<string, any> = {};
  formFields.forEach(field => {
    // Default values based on field type
    if (field.type === 'switch') {
      initialFormData[field.id] = false;
    } else { // Text input type
      initialFormData[field.id] = '';
    }
  });
  return initialFormData;
};

export default function App() {
  // State to manage which screen is currently visible
  const [currentScreen, setCurrentScreen] = useState('form');

  const [currentFormData, setCurrentFormData] = useState(createEmptyFormData());
  const [submittedForms, setSubmittedForms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadForms = async () => {
      try {
        const storedForms = await AsyncStorage.getItem(FORMS_STORAGE_KEY);
        if (storedForms !== null) {
          // Parse the stored JSON string back into a JavaScript array
          setSubmittedForms(JSON.parse(storedForms));
        }
      } catch (error) {
        console.error("Failed to load forms from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadForms();
  }, []); 

  useEffect(() => {
    if (!isLoading) {
      const saveForms = async () => {
        try {
          // Convert the JavaScript array to a JSON string before saving
          await AsyncStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(submittedForms));
        } catch (error) {
          console.error("Failed to save forms to storage:", error);
        }
      };

      saveForms();
    }
  }, [submittedForms, isLoading]);

  const resetFormData = () => {
    setCurrentFormData(createEmptyFormData());
  }

  // New form submission or to approve the edits
  const handleSubmitForm = (data: any) => {
    if (data.id) {
      setSubmittedForms(prevForms =>
        prevForms.map(form => (form.id === data.id ? data : form))
      );
    } else {
      const newFormWithId = { ...data, id: Date.now().toString() };
      setSubmittedForms(prevForms => [newFormWithId, ...prevForms]);
    }
    resetFormData();
    setCurrentScreen('viewer');
  };

  const goToForm = () => {
    resetFormData();
    setCurrentScreen('form');
  };

  const goToViewer = () => {
    setCurrentScreen('viewer');
  };

  const editForm = (formId: string) => {
    const formToEdit = submittedForms.find(form => form.id === formId);
    if (formToEdit) {
      setCurrentFormData(formToEdit);
      setCurrentScreen('form');
    }
  };

  const deleteForm = (formId: string) => {
    setSubmittedForms(prevForms => prevForms.filter(form => form.id !== formId));
    resetFormData();
    setCurrentScreen('viewer');
  };

  const screenSelector = (screen: string) => {
    if (isLoading) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading your scouting data...</Text>
        </SafeAreaView>
      );
    }

    switch (screen) {
      case 'form':
        return (
          <SafeAreaView style={styles.container}>
            <ScoutingForm
              initialFormData={currentFormData}
              onSubmit={handleSubmitForm}
              onCancelEdit={goToViewer}
              onDeleteForm={deleteForm}
            />
          </SafeAreaView>
        );
      case 'viewer':
        return (
          <SafeAreaView style={styles.container}>
            <FormViewer
              onGoToForm={goToForm}
              submittedForms={submittedForms}
              onEditForm={editForm}
            />
          </SafeAreaView>
        );
      default:
        return (
          <SafeAreaView style={styles.container}>
            <FormViewer
              onGoToForm={goToForm}
              submittedForms={submittedForms}
              onEditForm={editForm}
            />
          </SafeAreaView>
        );
    }
  };

  return screenSelector(currentScreen);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#4a5568',
  },
});
