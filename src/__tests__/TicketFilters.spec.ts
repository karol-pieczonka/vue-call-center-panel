import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import TicketFilters from '@/components/tickets/TicketFilters.vue'
import { useTicketsStore } from '@/stores/useTicketsStore'

describe('TicketFilters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('calls setStatusFilter when filter button is clicked', async () => {
    const wrapper = mount(TicketFilters)
    const store = useTicketsStore()

    const newButton = wrapper.findAll('button')[1]
    await newButton!.trigger('click')

    expect(store.statusFilter).toBe('new')
  })

  it('sets filter to null when "Wszystkie" is clicked', async () => {
    const store = useTicketsStore()
    store.setStatusFilter('new')

    const wrapper = mount(TicketFilters)
    const allButton = wrapper.findAll('button')[0]
    await allButton!.trigger('click')

    expect(store.statusFilter).toBeNull()
  })

  it('applies active class to current filter button', async () => {
    const store = useTicketsStore()
    store.setStatusFilter('in_progress')

    const wrapper = mount(TicketFilters)
    const inProgressButton = wrapper.findAll('button')[2]

    expect(inProgressButton!.classes()).toContain('active')
  })
})
