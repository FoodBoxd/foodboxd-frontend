import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function RecipePage() {
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true)

        const { data } = await api.get(`recipes`)
      } finally {
        setLoading (false)
      }
    }
  })
}