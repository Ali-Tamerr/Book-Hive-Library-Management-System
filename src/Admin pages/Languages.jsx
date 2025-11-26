import { useState } from 'react';
import {
    useLanguages,
    useCreateLanguage,
    useUpdateLanguage,
    useDeleteLanguage
} from '../hooks/useLanguages.js';
import LanguageFormPopup from '../components/LanguageFormPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function Languages({ searchValue }) {
    const [showPopup, setShowPopup] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        code: ''
    });

    const { data: languages = [], isLoading } = useLanguages();
    const createLanguageMutation = useCreateLanguage();
    const updateLanguageMutation = useUpdateLanguage();
    const deleteLanguageMutation = useDeleteLanguage();

    const handleAddLanguage = async (e) => {
        e.preventDefault();
        try {
            const apiData = {
                name: formData.name,
                code: formData.code
            };

            if (editMode && formData.language_id) {
                await updateLanguageMutation.mutateAsync({ id: formData.language_id, data: apiData });
            } else {
                await createLanguageMutation.mutateAsync(apiData);
            }
            setFormData({ name: '', code: '' });
            setShowPopup(false);
            setEditMode(false);
        } catch (error) {
            console.error("Failed to save language:", error);
            alert('Failed to save language. Please try again.');
        }
    };

    const handleEdit = (language) => {
        setFormData({
            language_id: language.language_id,
            name: language.name || '',
            code: language.code || ''
        });
        setEditMode(true);
        setShowPopup(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this language?')) {
            try {
                await deleteLanguageMutation.mutateAsync(id);
            } catch (error) {
                alert(`Failed to delete language: ${error.message || 'Unknown error'}. Please try again.`);
            }
        }
    };

    const buttonBehaviour = () => {
        setFormData({ name: '', code: '' });
        setEditMode(false);
        setShowPopup(true);
    };

    const filteredLanguages = searchValue
        ? languages.filter(
            (language) => {
                const name = language.name || '';
                const code = language.code || '';
                return name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    code.toLowerCase().includes(searchValue.toLowerCase());
            }
        )
        : languages;

    const title = "Language Management";
    const buttonText = "Add Language";
    const columns = [
        { header: 'Language ID', accessor: 'language_id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Action', accessor: 'action' },
    ];

    const formPopup = (
        <LanguageFormPopup
            showPopup={showPopup}
            editMode={editMode}
            formData={formData}
            setFormData={setFormData}
            handleAddLanguage={handleAddLanguage}
            setShowPopup={setShowPopup}
            setEditMode={setEditMode}
        />
    );

    return (
        <CommonLayout
            searchValue={searchValue}
            buttonBehaviour={buttonBehaviour}
            isLoading={isLoading}
            data={filteredLanguages}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            title={title}
            buttonText={buttonText}
            columns={columns}
            formPopup={formPopup}
        />
    );
}

export default Languages;
