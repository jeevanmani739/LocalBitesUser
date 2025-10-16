export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          created_at: string | null
          id: string
          is_default: boolean | null
          label: string
          latitude: number | null
          longitude: number | null
          state: string
          street_address: string
          user_id: string
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          label: string
          latitude?: number | null
          longitude?: number | null
          state: string
          street_address: string
          user_id: string
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          label?: string
          latitude?: number | null
          longitude?: number | null
          state?: string
          street_address?: string
          user_id?: string
          zip_code?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_locations: {
        Row: {
          accuracy: number | null
          altitude: number | null
          created_at: string | null
          driver_id: string
          heading: number | null
          id: string
          latitude: number
          longitude: number
          speed: number | null
          timestamp: string
        }
        Insert: {
          accuracy?: number | null
          altitude?: number | null
          created_at?: string | null
          driver_id: string
          heading?: number | null
          id?: string
          latitude: number
          longitude: number
          speed?: number | null
          timestamp: string
        }
        Update: {
          accuracy?: number | null
          altitude?: number | null
          created_at?: string | null
          driver_id?: string
          heading?: number | null
          id?: string
          latitude?: number
          longitude?: number
          speed?: number | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "driver_locations_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          acceptance_rate: number | null
          average_rating: number | null
          avg_delivery_time: number | null
          cancelled_deliveries: number | null
          completed_deliveries: number | null
          completion_rate: number | null
          created_at: string | null
          current_balance: number | null
          current_latitude: number | null
          current_longitude: number | null
          id: string
          insurance_expiry: string | null
          insurance_number: string | null
          is_accepting_orders: boolean | null
          is_available: boolean | null
          last_location_update: string | null
          license_expiry: string | null
          license_number: string
          notification_preferences: Json | null
          preferred_working_radius: number | null
          status: Database["public"]["Enums"]["driver_status"] | null
          total_deliveries: number | null
          total_earnings: number | null
          total_ratings: number | null
          updated_at: string | null
          user_id: string
          vehicle_color: string | null
          vehicle_make: string | null
          vehicle_model: string | null
          vehicle_number: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          vehicle_year: number | null
          verification_documents: Json | null
          verification_notes: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          acceptance_rate?: number | null
          average_rating?: number | null
          avg_delivery_time?: number | null
          cancelled_deliveries?: number | null
          completed_deliveries?: number | null
          completion_rate?: number | null
          created_at?: string | null
          current_balance?: number | null
          current_latitude?: number | null
          current_longitude?: number | null
          id?: string
          insurance_expiry?: string | null
          insurance_number?: string | null
          is_accepting_orders?: boolean | null
          is_available?: boolean | null
          last_location_update?: string | null
          license_expiry?: string | null
          license_number: string
          notification_preferences?: Json | null
          preferred_working_radius?: number | null
          status?: Database["public"]["Enums"]["driver_status"] | null
          total_deliveries?: number | null
          total_earnings?: number | null
          total_ratings?: number | null
          updated_at?: string | null
          user_id: string
          vehicle_color?: string | null
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_number: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          vehicle_year?: number | null
          verification_documents?: Json | null
          verification_notes?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          acceptance_rate?: number | null
          average_rating?: number | null
          avg_delivery_time?: number | null
          cancelled_deliveries?: number | null
          completed_deliveries?: number | null
          completion_rate?: number | null
          created_at?: string | null
          current_balance?: number | null
          current_latitude?: number | null
          current_longitude?: number | null
          id?: string
          insurance_expiry?: string | null
          insurance_number?: string | null
          is_accepting_orders?: boolean | null
          is_available?: boolean | null
          last_location_update?: string | null
          license_expiry?: string | null
          license_number?: string
          notification_preferences?: Json | null
          preferred_working_radius?: number | null
          status?: Database["public"]["Enums"]["driver_status"] | null
          total_deliveries?: number | null
          total_earnings?: number | null
          total_ratings?: number | null
          updated_at?: string | null
          user_id?: string
          vehicle_color?: string | null
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_number?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
          vehicle_year?: number | null
          verification_documents?: Json | null
          verification_notes?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drivers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      earnings: {
        Row: {
          bonus_amount: number | null
          created_at: string | null
          delivery_distance: number | null
          delivery_fee: number
          delivery_time: number | null
          driver_id: string
          earned_at: string | null
          id: string
          is_paid_out: boolean | null
          order_id: string
          payout_id: string | null
          platform_fee: number | null
          tip_amount: number | null
          total_earnings: number
        }
        Insert: {
          bonus_amount?: number | null
          created_at?: string | null
          delivery_distance?: number | null
          delivery_fee: number
          delivery_time?: number | null
          driver_id: string
          earned_at?: string | null
          id?: string
          is_paid_out?: boolean | null
          order_id: string
          payout_id?: string | null
          platform_fee?: number | null
          tip_amount?: number | null
          total_earnings: number
        }
        Update: {
          bonus_amount?: number | null
          created_at?: string | null
          delivery_distance?: number | null
          delivery_fee?: number
          delivery_time?: number | null
          driver_id?: string
          earned_at?: string | null
          id?: string
          is_paid_out?: boolean | null
          order_id?: string
          payout_id?: string | null
          platform_fee?: number | null
          tip_amount?: number | null
          total_earnings?: number
        }
        Relationships: [
          {
            foreignKeyName: "earnings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "earnings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_available: boolean | null
          menu_id: string | null
          name: string
          price: number
          restaurant_id: string
          tags: string[] | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          menu_id?: string | null
          name: string
          price: number
          restaurant_id: string
          tags?: string[] | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          menu_id?: string | null
          name?: string
          price?: number
          restaurant_id?: string
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          available_from: string | null
          available_until: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          available_from?: string | null
          available_until?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          available_from?: string | null
          available_until?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          customizations: Json | null
          id: string
          menu_item_description: string | null
          menu_item_id: string | null
          menu_item_image_url: string | null
          menu_item_name: string
          order_id: string
          quantity: number
          special_requests: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          customizations?: Json | null
          id?: string
          menu_item_description?: string | null
          menu_item_id?: string | null
          menu_item_image_url?: string | null
          menu_item_name: string
          order_id: string
          quantity: number
          special_requests?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          customizations?: Json | null
          id?: string
          menu_item_description?: string | null
          menu_item_id?: string | null
          menu_item_image_url?: string | null
          menu_item_name?: string
          order_id?: string
          quantity?: number
          special_requests?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          actual_delivery_time: string | null
          arrived_at: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          confirmed_at: string | null
          created_at: string | null
          customer_id: string
          customer_notes: string | null
          delivered_at: string | null
          delivery_address: string
          delivery_address_id: string | null
          delivery_contact_phone: string | null
          delivery_distance: number | null
          delivery_fee: number | null
          delivery_instructions: string | null
          delivery_latitude: number | null
          delivery_longitude: number | null
          discount: number | null
          driver_assigned_at: string | null
          driver_id: string | null
          driver_notes: string | null
          driver_rating: number | null
          estimated_delivery_time: string | null
          estimated_preparation_time: number | null
          id: string
          order_number: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          payment_transaction_id: string | null
          picked_up_at: string | null
          pickup_address: string
          pickup_contact_phone: string | null
          pickup_latitude: number | null
          pickup_longitude: number | null
          preparing_at: string | null
          proof_of_delivery_url: string | null
          ready_at: string | null
          refunded_at: string | null
          restaurant_id: string
          restaurant_rating: number | null
          service_charge: number | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax: number | null
          tip: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          actual_delivery_time?: string | null
          arrived_at?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          customer_id: string
          customer_notes?: string | null
          delivered_at?: string | null
          delivery_address: string
          delivery_address_id?: string | null
          delivery_contact_phone?: string | null
          delivery_distance?: number | null
          delivery_fee?: number | null
          delivery_instructions?: string | null
          delivery_latitude?: number | null
          delivery_longitude?: number | null
          discount?: number | null
          driver_assigned_at?: string | null
          driver_id?: string | null
          driver_notes?: string | null
          driver_rating?: number | null
          estimated_delivery_time?: string | null
          estimated_preparation_time?: number | null
          id?: string
          order_number: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_transaction_id?: string | null
          picked_up_at?: string | null
          pickup_address: string
          pickup_contact_phone?: string | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          preparing_at?: string | null
          proof_of_delivery_url?: string | null
          ready_at?: string | null
          refunded_at?: string | null
          restaurant_id: string
          restaurant_rating?: number | null
          service_charge?: number | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax?: number | null
          tip?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          actual_delivery_time?: string | null
          arrived_at?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          customer_id?: string
          customer_notes?: string | null
          delivered_at?: string | null
          delivery_address?: string
          delivery_address_id?: string | null
          delivery_contact_phone?: string | null
          delivery_distance?: number | null
          delivery_fee?: number | null
          delivery_instructions?: string | null
          delivery_latitude?: number | null
          delivery_longitude?: number | null
          discount?: number | null
          driver_assigned_at?: string | null
          driver_id?: string | null
          driver_notes?: string | null
          driver_rating?: number | null
          estimated_delivery_time?: string | null
          estimated_preparation_time?: number | null
          id?: string
          order_number?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_transaction_id?: string | null
          picked_up_at?: string | null
          pickup_address?: string
          pickup_contact_phone?: string | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          preparing_at?: string | null
          proof_of_delivery_url?: string | null
          ready_at?: string | null
          refunded_at?: string | null
          restaurant_id?: string
          restaurant_rating?: number | null
          service_charge?: number | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number
          tax?: number | null
          tip?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_delivery_address_id_fkey"
            columns: ["delivery_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string | null
          customer_id: string
          failed_at: string | null
          failure_reason: string | null
          gateway_name: string | null
          gateway_reference: string | null
          id: string
          initiated_at: string | null
          order_id: string
          payment_metadata: Json | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          refund_amount: number | null
          refund_reason: string | null
          refund_transaction_id: string | null
          refunded_at: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id: string
          failed_at?: string | null
          failure_reason?: string | null
          gateway_name?: string | null
          gateway_reference?: string | null
          id?: string
          initiated_at?: string | null
          order_id: string
          payment_metadata?: Json | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          refund_amount?: number | null
          refund_reason?: string | null
          refund_transaction_id?: string | null
          refunded_at?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string
          failed_at?: string | null
          failure_reason?: string | null
          gateway_name?: string | null
          gateway_reference?: string | null
          id?: string
          initiated_at?: string | null
          order_id?: string
          payment_metadata?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          refund_amount?: number | null
          refund_reason?: string | null
          refund_transaction_id?: string | null
          refunded_at?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          amount: number
          bank_account_number: string | null
          bank_ifsc_code: string | null
          completed_at: string | null
          created_at: string | null
          currency: string | null
          driver_id: string
          earnings_count: number | null
          failed_at: string | null
          failure_reason: string | null
          id: string
          initiated_at: string | null
          notes: string | null
          payout_method: string | null
          period_end: string
          period_start: string
          status: string | null
          transaction_reference: string | null
          updated_at: string | null
          upi_id: string | null
        }
        Insert: {
          amount: number
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          driver_id: string
          earnings_count?: number | null
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          initiated_at?: string | null
          notes?: string | null
          payout_method?: string | null
          period_end: string
          period_start: string
          status?: string | null
          transaction_reference?: string | null
          updated_at?: string | null
          upi_id?: string | null
        }
        Update: {
          amount?: number
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          driver_id?: string
          earnings_count?: number | null
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          initiated_at?: string | null
          notes?: string | null
          payout_method?: string | null
          period_end?: string
          period_start?: string
          status?: string | null
          transaction_reference?: string | null
          updated_at?: string | null
          upi_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_analytics: {
        Row: {
          active_customers: number | null
          active_drivers: number | null
          active_restaurants: number | null
          average_delivery_time: number | null
          average_order_value: number | null
          cancelled_orders: number | null
          completed_orders: number | null
          created_at: string | null
          date: string
          driver_earnings: number | null
          gross_revenue: number | null
          id: string
          new_customers: number | null
          platform_revenue: number | null
          restaurant_revenue: number | null
          total_customers: number | null
          total_drivers: number | null
          total_orders: number | null
          total_restaurants: number | null
          updated_at: string | null
        }
        Insert: {
          active_customers?: number | null
          active_drivers?: number | null
          active_restaurants?: number | null
          average_delivery_time?: number | null
          average_order_value?: number | null
          cancelled_orders?: number | null
          completed_orders?: number | null
          created_at?: string | null
          date: string
          driver_earnings?: number | null
          gross_revenue?: number | null
          id?: string
          new_customers?: number | null
          platform_revenue?: number | null
          restaurant_revenue?: number | null
          total_customers?: number | null
          total_drivers?: number | null
          total_orders?: number | null
          total_restaurants?: number | null
          updated_at?: string | null
        }
        Update: {
          active_customers?: number | null
          active_drivers?: number | null
          active_restaurants?: number | null
          average_delivery_time?: number | null
          average_order_value?: number | null
          cancelled_orders?: number | null
          completed_orders?: number | null
          created_at?: string | null
          date?: string
          driver_earnings?: number | null
          gross_revenue?: number | null
          id?: string
          new_customers?: number | null
          platform_revenue?: number | null
          restaurant_revenue?: number | null
          total_customers?: number | null
          total_drivers?: number | null
          total_orders?: number | null
          total_restaurants?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      popular_items: {
        Row: {
          created_at: string | null
          date: string
          id: string
          menu_item_id: string
          order_count: number | null
          restaurant_id: string
          total_quantity: number | null
          total_revenue: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          menu_item_id: string
          order_count?: number | null
          restaurant_id: string
          total_quantity?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          menu_item_id?: string
          order_count?: number | null
          restaurant_id?: string
          total_quantity?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "popular_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "popular_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_users: {
        Row: {
          admin_role: Database["public"]["Enums"]["admin_role"]
          assigned_by: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_active_at: string | null
          notes: string | null
          permissions: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_role?: Database["public"]["Enums"]["admin_role"]
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_active_at?: string | null
          notes?: string | null
          permissions?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_role?: Database["public"]["Enums"]["admin_role"]
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_active_at?: string | null
          notes?: string | null
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_users_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portal_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          email_verified: boolean | null
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login_at: string | null
          phone: string | null
          phone_verified: boolean | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          last_login_at?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      restaurant_analytics: {
        Row: {
          average_delivery_time: number | null
          average_order_value: number | null
          average_preparation_time: number | null
          average_rating: number | null
          cancelled_orders: number | null
          completed_orders: number | null
          created_at: string | null
          date: string
          gross_revenue: number | null
          id: string
          net_revenue: number | null
          new_customers: number | null
          platform_fees: number | null
          restaurant_id: string
          returning_customers: number | null
          total_items_sold: number | null
          total_orders: number | null
          total_reviews: number | null
          unique_customers: number | null
          updated_at: string | null
        }
        Insert: {
          average_delivery_time?: number | null
          average_order_value?: number | null
          average_preparation_time?: number | null
          average_rating?: number | null
          cancelled_orders?: number | null
          completed_orders?: number | null
          created_at?: string | null
          date: string
          gross_revenue?: number | null
          id?: string
          net_revenue?: number | null
          new_customers?: number | null
          platform_fees?: number | null
          restaurant_id: string
          returning_customers?: number | null
          total_items_sold?: number | null
          total_orders?: number | null
          total_reviews?: number | null
          unique_customers?: number | null
          updated_at?: string | null
        }
        Update: {
          average_delivery_time?: number | null
          average_order_value?: number | null
          average_preparation_time?: number | null
          average_rating?: number | null
          cancelled_orders?: number | null
          completed_orders?: number | null
          created_at?: string | null
          date?: string
          gross_revenue?: number | null
          id?: string
          net_revenue?: number | null
          new_customers?: number | null
          platform_fees?: number | null
          restaurant_id?: string
          returning_customers?: number | null
          total_items_sold?: number | null
          total_orders?: number | null
          total_reviews?: number | null
          unique_customers?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_analytics_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_applications: {
        Row: {
          address: string
          applicant_id: string
          business_license_url: string | null
          business_type: string | null
          city: string
          created_at: string | null
          cuisine_types: string[] | null
          documents: Json | null
          email: string
          food_license_url: string | null
          id: string
          owner_id_proof_url: string | null
          owner_name: string
          phone: string
          registration_number: string | null
          rejection_reason: string | null
          restaurant_name: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          state: string
          status: Database["public"]["Enums"]["application_status"] | null
          submitted_at: string | null
          tax_id: string | null
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          address: string
          applicant_id: string
          business_license_url?: string | null
          business_type?: string | null
          city: string
          created_at?: string | null
          cuisine_types?: string[] | null
          documents?: Json | null
          email: string
          food_license_url?: string | null
          id?: string
          owner_id_proof_url?: string | null
          owner_name: string
          phone: string
          registration_number?: string | null
          rejection_reason?: string | null
          restaurant_name: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          state: string
          status?: Database["public"]["Enums"]["application_status"] | null
          submitted_at?: string | null
          tax_id?: string | null
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          address?: string
          applicant_id?: string
          business_license_url?: string | null
          business_type?: string | null
          city?: string
          created_at?: string | null
          cuisine_types?: string[] | null
          documents?: Json | null
          email?: string
          food_license_url?: string | null
          id?: string
          owner_id_proof_url?: string | null
          owner_name?: string
          phone?: string
          registration_number?: string | null
          rejection_reason?: string | null
          restaurant_name?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          state?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          submitted_at?: string | null
          tax_id?: string | null
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          accepts_orders: boolean | null
          city: string | null
          created_at: string | null
          cuisine_type: string
          delivery_fee: number | null
          delivery_time: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_featured: boolean | null
          is_open: boolean | null
          latitude: number | null
          longitude: number | null
          min_order: number | null
          name: string
          rating: number | null
          total_reviews: number | null
          user_id: string | null
        }
        Insert: {
          accepts_orders?: boolean | null
          city?: string | null
          created_at?: string | null
          cuisine_type: string
          delivery_fee?: number | null
          delivery_time?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_open?: boolean | null
          latitude?: number | null
          longitude?: number | null
          min_order?: number | null
          name: string
          rating?: number | null
          total_reviews?: number | null
          user_id?: string | null
        }
        Update: {
          accepts_orders?: boolean | null
          city?: string | null
          created_at?: string | null
          cuisine_type?: string
          delivery_fee?: number | null
          delivery_time?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_open?: boolean | null
          latitude?: number | null
          longitude?: number | null
          min_order?: number | null
          name?: string
          rating?: number | null
          total_reviews?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants_cuisines: {
        Row: {
          created_at: string | null
          cuisine: string
          id: string
          restaurant_id: string
        }
        Insert: {
          created_at?: string | null
          cuisine: string
          id?: string
          restaurant_id: string
        }
        Update: {
          created_at?: string | null
          cuisine?: string
          id?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_cuisines_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      review_votes: {
        Row: {
          created_at: string | null
          id: string
          is_helpful: boolean
          review_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_helpful: boolean
          review_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_helpful?: boolean
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_votes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string | null
          customer_id: string
          delivery_speed_rating: number | null
          driver_id: string | null
          driver_rating: number | null
          driver_review_text: string | null
          flag_reason: string | null
          food_quality_rating: number | null
          helpful_count: number | null
          id: string
          is_flagged: boolean | null
          is_verified: boolean | null
          is_visible: boolean | null
          moderated_at: string | null
          moderated_by: string | null
          not_helpful_count: number | null
          order_id: string
          restaurant_id: string
          restaurant_rating: number | null
          restaurant_responded_at: string | null
          restaurant_response: string | null
          restaurant_review_text: string | null
          review_images: string[] | null
          updated_at: string | null
          value_rating: number | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          delivery_speed_rating?: number | null
          driver_id?: string | null
          driver_rating?: number | null
          driver_review_text?: string | null
          flag_reason?: string | null
          food_quality_rating?: number | null
          helpful_count?: number | null
          id?: string
          is_flagged?: boolean | null
          is_verified?: boolean | null
          is_visible?: boolean | null
          moderated_at?: string | null
          moderated_by?: string | null
          not_helpful_count?: number | null
          order_id: string
          restaurant_id: string
          restaurant_rating?: number | null
          restaurant_responded_at?: string | null
          restaurant_response?: string | null
          restaurant_review_text?: string | null
          review_images?: string[] | null
          updated_at?: string | null
          value_rating?: number | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          delivery_speed_rating?: number | null
          driver_id?: string | null
          driver_rating?: number | null
          driver_review_text?: string | null
          flag_reason?: string | null
          food_quality_rating?: number | null
          helpful_count?: number | null
          id?: string
          is_flagged?: boolean | null
          is_verified?: boolean | null
          is_visible?: boolean | null
          moderated_at?: string | null
          moderated_by?: string | null
          not_helpful_count?: number | null
          order_id?: string
          restaurant_id?: string
          restaurant_rating?: number | null
          restaurant_responded_at?: string | null
          restaurant_response?: string | null
          restaurant_review_text?: string | null
          review_images?: string[] | null
          updated_at?: string | null
          value_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_moderated_by_fkey"
            columns: ["moderated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_at: string | null
          assigned_to: string | null
          attachments: string[] | null
          category: string
          created_at: string | null
          customer_satisfaction_rating: number | null
          description: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"] | null
          related_driver_id: string | null
          related_order_id: string | null
          related_restaurant_id: string | null
          requester_id: string
          requester_type: Database["public"]["Enums"]["user_type"]
          resolution: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          ticket_number: string
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_to?: string | null
          attachments?: string[] | null
          category: string
          created_at?: string | null
          customer_satisfaction_rating?: number | null
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          related_driver_id?: string | null
          related_order_id?: string | null
          related_restaurant_id?: string | null
          requester_id: string
          requester_type: Database["public"]["Enums"]["user_type"]
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          ticket_number: string
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_to?: string | null
          attachments?: string[] | null
          category?: string
          created_at?: string | null
          customer_satisfaction_rating?: number | null
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          related_driver_id?: string | null
          related_order_id?: string | null
          related_restaurant_id?: string | null
          requester_id?: string
          requester_type?: Database["public"]["Enums"]["user_type"]
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject?: string
          ticket_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "portal_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_related_driver_id_fkey"
            columns: ["related_driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_related_order_id_fkey"
            columns: ["related_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_related_restaurant_id_fkey"
            columns: ["related_restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "portal_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          attachments: string[] | null
          created_at: string | null
          id: string
          is_internal: boolean | null
          message: string
          sender_id: string
          ticket_id: string
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message: string
          sender_id: string
          ticket_id: string
        }
        Update: {
          attachments?: string[] | null
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message?: string
          sender_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_distance: {
        Args: { lat1: number; lat2: number; lon1: number; lon2: number }
        Returns: number
      }
      calculate_driver_earnings: {
        Args: { p_driver_id: string; p_end_date: string; p_start_date: string }
        Returns: {
          avg_delivery_time: number
          total_deliveries: number
          total_distance: number
          total_earnings: number
          total_tips: number
        }[]
      }
      calculate_order_total: {
        Args: {
          p_delivery_fee?: number
          p_discount?: number
          p_service_charge?: number
          p_subtotal: number
          p_tax?: number
          p_tip?: number
        }
        Returns: number
      }
      cleanup_old_driver_locations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      format_address: {
        Args: { address_id: string }
        Returns: string
      }
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_ticket_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_restaurant_revenue: {
        Args: {
          p_end_date: string
          p_restaurant_id: string
          p_start_date: string
        }
        Returns: {
          avg_order_value: number
          total_orders: number
          total_revenue: number
        }[]
      }
      is_menu_available: {
        Args: { check_time?: string; menu_id: string }
        Returns: boolean
      }
      update_platform_analytics: {
        Args: { analytics_date?: string }
        Returns: undefined
      }
      update_restaurant_analytics: {
        Args: { analytics_date?: string }
        Returns: undefined
      }
    }
    Enums: {
      admin_role:
        | "super_admin"
        | "manager"
        | "support_agent"
        | "finance_manager"
        | "content_moderator"
      application_status:
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "requires_more_info"
      driver_status: "online" | "offline" | "busy"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "ready_for_pickup"
        | "driver_assigned"
        | "picked_up"
        | "in_transit"
        | "arrived"
        | "delivered"
        | "cancelled"
        | "refunded"
      payment_method: "card" | "cash" | "wallet" | "upi" | "net_banking"
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "refunded"
        | "partially_refunded"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status:
        | "open"
        | "in_progress"
        | "waiting_for_customer"
        | "waiting_for_driver"
        | "waiting_for_restaurant"
        | "resolved"
        | "closed"
      user_type: "customer" | "driver" | "restaurant_manager" | "admin"
      vehicle_type: "car" | "bike" | "scooter" | "bicycle"
      verification_status:
        | "pending"
        | "under_review"
        | "approved"
        | "rejected"
        | "requires_resubmission"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      admin_role: [
        "super_admin",
        "manager",
        "support_agent",
        "finance_manager",
        "content_moderator",
      ],
      application_status: [
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "requires_more_info",
      ],
      driver_status: ["online", "offline", "busy"],
      order_status: [
        "pending",
        "confirmed",
        "preparing",
        "ready_for_pickup",
        "driver_assigned",
        "picked_up",
        "in_transit",
        "arrived",
        "delivered",
        "cancelled",
        "refunded",
      ],
      payment_method: ["card", "cash", "wallet", "upi", "net_banking"],
      payment_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_status: [
        "open",
        "in_progress",
        "waiting_for_customer",
        "waiting_for_driver",
        "waiting_for_restaurant",
        "resolved",
        "closed",
      ],
      user_type: ["customer", "driver", "restaurant_manager", "admin"],
      vehicle_type: ["car", "bike", "scooter", "bicycle"],
      verification_status: [
        "pending",
        "under_review",
        "approved",
        "rejected",
        "requires_resubmission",
      ],
    },
  },
} as const
