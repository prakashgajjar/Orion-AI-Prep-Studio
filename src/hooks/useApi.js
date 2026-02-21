/**
 * Custom Hook: useApi
 * Simplify API calls with built-in loading and error handling
 */

import { useState, useCallback } from "react";
import api from "@/services/api";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = useCallback(async (apiFunction, payload) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(payload);
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err.message || "An error occurred";
      setError(errorMessage);
      console.error("API Error:", errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { call, loading, error, setError };
};

/**
 * Custom Hook: useForm with API Integration
 * Handle form state, validation, and submission
 */
export const useFormWithApi = (initialValues, onSubmit) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      const result = await onSubmit(formData);
      if (result.success) {
        setFormData(initialValues); // Reset form
      } else if (result.errors) {
        setErrors(result.errors);
      }
      return result;
    } catch (err) {
      setErrors({ submit: err.message });
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    reset,
    setFormData,
  };
};

/**
 * Custom Hook: usePagination
 * Handle pagination logic
 */
export const usePagination = (items, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
  };
};
